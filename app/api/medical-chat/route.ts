import { openai } from "@ai-sdk/openai"
import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { mockChatResponses } from "@/lib/mock-data"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.log("[v0] Demo mode: No API key found, using mock chat responses")
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
          controller.enqueue(encoder.encode(`0:"${response}"\n`))
          controller.close()
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

    const model = openai("gpt-4", {
      apiKey: process.env.OPENAI_API_KEY,
    })

    const systemPrompt = `You are a helpful medical AI assistant. You have access to the patient's medical report analysis:

${reportContext}

Use this context to provide accurate, helpful responses about the patient's health. Always:
- Be empathetic and professional
- Provide evidence-based information
- Recommend consulting healthcare professionals for serious concerns
- Never provide definitive medical diagnoses
- Explain medical terms in simple language`

    const modelMessages = convertToModelMessages(messages)

    const result = streamText({
      model,
      system: systemPrompt,
      messages: modelMessages,
      maxOutputTokens: 1000,
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorBody = error instanceof Error && "response" in error ? (error as any).response?.body : null

    console.error("[v0] Error in medical chat:", errorMessage)

    // Check for quota, billing, or any API errors
    if (
      errorMessage.includes("insufficient_quota") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("billing") ||
      errorMessage.includes("401") ||
      errorMessage.includes("403") ||
      errorMessage.includes("429") ||
      errorBody?.includes("insufficient_quota")
    ) {
      console.log("[v0] API error detected, falling back to demo mode")
      const mockResponse = mockChatResponses.default
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`0:"${mockResponse}"\n`))
          controller.close()
        },
      })
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
        },
      })
    }

    // Fall back to demo mode for any unexpected API errors
    console.log("[v0] Unexpected error, using demo mode")
    const mockResponse = mockChatResponses.default
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`0:"${mockResponse}"\n`))
        controller.close()
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
