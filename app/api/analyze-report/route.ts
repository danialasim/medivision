import { GoogleGenerativeAI } from "@google/generative-ai"
import { z } from "zod"
import { mockMedicalAnalysis } from "@/lib/mock-data"

const medicalReportSchema = z.object({
  reportType: z.string().describe("Type of medical report (e.g., Blood Test, X-Ray)"),
  date: z.string().describe("Date of the report"),
  summary: z.string().describe("Brief summary of the report"),
  testResults: z
    .array(
      z.object({
        name: z.string().describe("Test name"),
        value: z.number().describe("Test value"),
        unit: z.string().describe("Unit of measurement"),
        normalRange: z.string().describe("Normal range for this test"),
        status: z.enum(["normal", "borderline", "abnormal"]).describe("Status of the result"),
      }),
    )
    .describe("Array of test results"),
  abnormalValues: z
    .array(
      z.object({
        name: z.string().describe("Name of abnormal value"),
        value: z.number().describe("The abnormal value"),
        normalRange: z.string().describe("Normal range"),
        severity: z.enum(["low", "medium", "high"]).describe("Severity level"),
        explanation: z.string().describe("Why this is abnormal"),
      }),
    )
    .describe("Array of abnormal values with explanations"),
  recommendations: z.array(z.string()).describe("Health recommendations based on results"),
  specialists: z
    .array(
      z.object({
        type: z.string().describe("Type of specialist"),
        reason: z.string().describe("Reason to see this specialist"),
      }),
    )
    .describe("Recommended specialists"),
  healthStatus: z
    .object({
      normalCount: z.number().describe("Number of normal results"),
      borderlineCount: z.number().describe("Number of borderline results"),
      abnormalCount: z.number().describe("Number of abnormal results"),
      overallStatus: z.enum(["healthy", "caution", "concerning"]).describe("Overall health status"),
    })
    .describe("Summary of health status"),
})

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.log("[MediVision] Demo mode: No Gemini API key found, using mock medical analysis data")
      return Response.json({ analysis: mockMedicalAnalysis, demoMode: true })
    }

    const { imageData } = await req.json()

    if (!imageData) {
      return Response.json({ error: "No image data provided" }, { status: 400 })
    }

    // Initialize Gemini with the latest Gemini 2.0 Flash model (FREE tier, most advanced)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    // Convert base64 image data
    const base64Data = imageData.split(",")[1] || imageData
    
    const prompt = `Analyze this medical report image and extract all relevant information. Return the data in the following JSON format:

{
  "reportType": "Type of medical report (e.g., Blood Test, X-Ray)",
  "date": "Date of the report",
  "summary": "Brief summary of the report",
  "testResults": [
    {
      "name": "Test name",
      "value": numeric value,
      "unit": "Unit of measurement",
      "normalRange": "Normal range for this test",
      "status": "normal" or "borderline" or "abnormal"
    }
  ],
  "abnormalValues": [
    {
      "name": "Name of abnormal value",
      "value": numeric value,
      "normalRange": "Normal range",
      "severity": "low" or "medium" or "high",
      "explanation": "Why this is abnormal and what it means"
    }
  ],
  "recommendations": ["Health recommendation 1", "Health recommendation 2"],
  "specialists": [
    {
      "type": "Type of specialist",
      "reason": "Reason to see this specialist"
    }
  ],
  "healthStatus": {
    "normalCount": number of normal results,
    "borderlineCount": number of borderline results,
    "abnormalCount": number of abnormal results,
    "overallStatus": "healthy" or "caution" or "concerning"
  }
}

Be thorough and accurate. Extract all test results you can see. For any abnormal values, provide clear explanations. Give practical health recommendations.`

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data,
        },
      },
    ])

    const response = await result.response
    const text = response.text()
    
    // Extract JSON from response (Gemini might wrap it in markdown)
    let jsonText = text
    if (text.includes("```json")) {
      jsonText = text.split("```json")[1].split("```")[0].trim()
    } else if (text.includes("```")) {
      jsonText = text.split("```")[1].split("```")[0].trim()
    }

    const analysis = JSON.parse(jsonText)
    
    // Validate with Zod
    const validatedAnalysis = medicalReportSchema.parse(analysis)

    console.log("[MediVision] Successfully analyzed report with Gemini")
    return Response.json({ analysis: validatedAnalysis, demoMode: false })
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[MediVision] Error analyzing report:", errorMessage)

    // Check for API errors
    if (
      errorMessage.includes("API_KEY") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("billing") ||
      errorMessage.includes("401") ||
      errorMessage.includes("403") ||
      errorMessage.includes("429")
    ) {
      console.log("[MediVision] API error detected, falling back to demo mode with mock data")
      return Response.json({
        analysis: mockMedicalAnalysis,
        demoMode: true,
        reason: "api_error",
      })
    }

    // Fall back to demo mode for any unexpected API errors
    console.log("[MediVision] Unexpected error, using demo mode")
    return Response.json({
      analysis: mockMedicalAnalysis,
      demoMode: true,
      reason: "api_error",
    })
  }
}
