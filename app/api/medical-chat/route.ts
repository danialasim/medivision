import { GoogleGenerativeAI } from "@google/generative-ai"
import { mockChatResponses } from "@/lib/mock-data"

export const maxDuration = 30

interface UIMessage {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("[MediVision] Demo mode: No Gemini API key found, using mock chat responses")
      const { messages } = await req.json()
      const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""

      let response = mockChatResponses.default
      if (lastMessage.includes("abnormal") || lastMessage.includes("value")) {
        response = mockChatResponses.abnormal
      } else if (lastMessage.includes("remedy") || lastMessage.includes("home")) {
        response = mockChatResponses.remedies
      } else if (lastMessage.includes("doctor") || lastMessage.includes("specialist")) {
        response = mockChatResponses.doctor
      } else if (lastMessage.includes("urgent") || lastMessage.includes("emergency")) {
        response = mockChatResponses.urgent
      }

      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          // Simulate streaming for better UX
          const words = response.split(" ")
          let index = 0
          const intervalId = setInterval(() => {
            if (index < words.length) {
              controller.enqueue(encoder.encode(`0:{"type":"text-delta","delta":"${words[index]} "}\n`))
              index++
            } else {
              clearInterval(intervalId)
              controller.close()
            }
          }, 50)
        },
      })

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
        },
      })
    }

    const { messages, reportContext }: { messages: UIMessage[]; reportContext: string } = await req.json()

    if (!messages || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 })
    }

    // Initialize Gemini with the latest Gemini 2.0 Flash model (FREE tier, most advanced)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const systemPrompt = `You are a helpful medical AI assistant. You have access to the patient's medical report analysis:

${reportContext}

Use this context to provide accurate, helpful responses about the patient's health. Always:
- Be empathetic and professional
- Provide evidence-based information
- Recommend consulting healthcare professionals for serious concerns
- Never provide definitive medical diagnoses
- Explain medical terms in simple language

Keep responses concise but informative.`

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map((msg: UIMessage) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm here to help you understand your medical report. I'll provide clear, empathetic, and evidence-based information while recommending professional medical consultation for serious concerns." }],
        },
        ...history,
      ],
    })

    const lastMessage = messages[messages.length - 1].content
    const result = await chat.sendMessageStream(lastMessage)

    // Create a streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            if (text) {
              controller.enqueue(encoder.encode(`0:{"type":"text-delta","delta":"${text}"}\n`))
            }
          }
          controller.close()
        } catch (error) {
          console.error("[MediVision] Stream error:", error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[MediVision] Error in medical chat:", errorMessage)

    // Fall back to demo mode for any API errors
    console.log("[MediVision] API error detected, falling back to demo mode")
    const mockResponse = mockChatResponses.default
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        const words = mockResponse.split(" ")
        let index = 0
        const intervalId = setInterval(() => {
          if (index < words.length) {
            controller.enqueue(encoder.encode(`0:{"type":"text-delta","delta":"${words[index]} "}\n`))
            index++
          } else {
            clearInterval(intervalId)
            controller.close()
          }
        }, 50)
      },
    })
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  }
}
