"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface TestResult {
  name: string
  value: number
  unit: string
  normalRange: string
  status: "normal" | "borderline" | "abnormal"
}

interface AbnormalValue {
  name: string
  value: number
  normalRange: string
  severity: "low" | "medium" | "high"
  explanation: string
}

interface Specialist {
  type: string
  reason: string
}

interface HealthStatus {
  normalCount: number
  borderlineCount: number
  abnormalCount: number
  overallStatus: "healthy" | "caution" | "concerning"
}

interface ReportAnalysis {
  reportType: string
  date: string
  summary: string
  testResults: TestResult[]
  abnormalValues: AbnormalValue[]
  recommendations: string[]
  specialists: Specialist[]
  healthStatus: HealthStatus
}

interface ReportContextType {
  analysis: ReportAnalysis | null
  uploadedImage: string | null
  setAnalysis: (analysis: ReportAnalysis) => void
  setUploadedImage: (image: string) => void
  clearAnalysis: () => void
  getContextString: () => string
}

const ReportContext = createContext<ReportContextType | undefined>(undefined)

export function ReportProvider({ children }: { children: ReactNode }) {
  const [analysis, setAnalysis] = useState<ReportAnalysis | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const clearAnalysis = () => {
    setAnalysis(null)
    setUploadedImage(null)
  }

  const getContextString = () => {
    if (!analysis) return ""

    return `
Report Type: ${analysis.reportType}
Date: ${analysis.date}
Summary: ${analysis.summary}

Test Results:
${analysis.testResults.map((r) => `- ${r.name}: ${r.value} ${r.unit} (Normal: ${r.normalRange}) - Status: ${r.status}`).join("\n")}

Abnormal Values:
${analysis.abnormalValues.map((a) => `- ${a.name}: ${a.value} (Normal: ${a.normalRange}) - Severity: ${a.severity} - ${a.explanation}`).join("\n")}

Health Status: ${analysis.healthStatus.overallStatus} (Normal: ${analysis.healthStatus.normalCount}, Borderline: ${analysis.healthStatus.borderlineCount}, Abnormal: ${analysis.healthStatus.abnormalCount})

Recommendations:
${analysis.recommendations.map((r) => `- ${r}`).join("\n")}

Recommended Specialists:
${analysis.specialists.map((s) => `- ${s.type}: ${s.reason}`).join("\n")}
    `.trim()
  }

  return (
    <ReportContext.Provider
      value={{ analysis, uploadedImage, setAnalysis, setUploadedImage, clearAnalysis, getContextString }}
    >
      {children}
    </ReportContext.Provider>
  )
}

export function useReport() {
  const context = useContext(ReportContext)
  if (!context) {
    throw new Error("useReport must be used within ReportProvider")
  }
  return context
}
