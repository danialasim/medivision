"use client"
import { useReport } from "@/lib/report-context"
import { ReportImage } from "@/components/dashboard/report-image"
import { ReportSummary } from "@/components/dashboard/report-summary"
import { TestResultsTable } from "@/components/dashboard/test-results-table"
import { AbnormalValues } from "@/components/dashboard/abnormal-values"
import { HealthStatus } from "@/components/dashboard/health-status"
import { Recommendations } from "@/components/dashboard/recommendations"
import { SpecialistSuggestions } from "@/components/dashboard/specialist-suggestions"
import { Button } from "@/components/ui/button"
import { MessageCircle, Download, Share2, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { analysis, uploadedImage } = useReport()
  const router = useRouter()

  if (!analysis || !uploadedImage) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-background dark:from-background dark:via-blue-950/10 dark:to-background py-16 px-4 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto animate-fade-in">
          <div className="mb-6 p-6 rounded-full bg-blue-100 dark:bg-blue-900/30 w-fit mx-auto">
            <svg
              className="w-16 h-16 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-foreground">No Report Loaded</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Please upload a medical report first to see your personalized health analysis
          </p>
          <Button
            onClick={() => router.push("/")}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Upload Report
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-purple-50/20 dark:from-background dark:via-blue-950/10 dark:to-purple-950/10 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/")}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Medical Report Analysis
              </h1>
              <p className="text-muted-foreground text-lg">
                Comprehensive AI-powered analysis of your health report
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Report Image & Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="animate-slide-up">
              <ReportImage image={uploadedImage} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <ReportSummary type={analysis.reportType} date={analysis.date} />
            </div>
          </div>

          {/* Right Column - Analysis Sections */}
          <div className="lg:col-span-2 space-y-6">
            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <HealthStatus results={analysis.testResults} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
              <TestResultsTable results={analysis.testResults} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
              <AbnormalValues values={analysis.abnormalValues} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "500ms" }}>
              <Recommendations recommendations={analysis.recommendations} />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "600ms" }}>
              <SpecialistSuggestions specialists={analysis.specialists} />
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "700ms" }}>
          <Button
            onClick={() => router.push("/chat")}
            size="lg"
            className="gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 px-8 py-6 text-lg font-bold"
          >
            <MessageCircle className="w-6 h-6" />
            Chat with AI Assistant
          </Button>
        </div>
      </div>
    </main>
  )
}
