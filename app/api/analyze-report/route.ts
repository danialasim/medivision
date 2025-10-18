import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
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
    if (!process.env.OPENAI_API_KEY) {
      console.log("[v0] Demo mode: No API key found, using mock medical analysis data")
      return Response.json({ analysis: mockMedicalAnalysis, demoMode: true })
    }

    const { imageData } = await req.json()

    if (!imageData) {
      return Response.json({ error: "No image data provided" }, { status: 400 })
    }

    const model = openai("gpt-4o", {
      apiKey: process.env.OPENAI_API_KEY,
    })

    const { object } = await generateObject({
      model,
      schema: medicalReportSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this medical report image and extract all relevant information including test results, abnormal values, and health recommendations. Be thorough and accurate.",
            },
            {
              type: "image",
              image: imageData,
            },
          ],
        },
      ],
    })

    return Response.json({ analysis: object, demoMode: false })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorBody = error instanceof Error && "response" in error ? (error as any).response?.body : null

    console.error("[v0] Error analyzing report:", errorMessage)

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
      console.log("[v0] API error detected, falling back to demo mode with mock data")
      return Response.json({ 
        analysis: mockMedicalAnalysis, 
        demoMode: true,
        reason: "quota_exceeded" 
      })
    }

    // Fall back to demo mode for any unexpected API errors
    console.log("[v0] Unexpected error, using demo mode")
    return Response.json({ 
      analysis: mockMedicalAnalysis, 
      demoMode: true,
      reason: "api_error" 
    })
  }
}
