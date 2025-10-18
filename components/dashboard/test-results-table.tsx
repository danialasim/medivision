import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react"

interface TestResult {
  name: string
  value: number
  unit: string
  normalRange: string
  status: "normal" | "borderline" | "abnormal"
}

interface TestResultsTableProps {
  results: TestResult[]
}

export function TestResultsTable({ results }: TestResultsTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle2 className="w-4 h-4 text-status-normal" />
      case "borderline":
        return <AlertTriangle className="w-4 h-4 text-status-borderline" />
      case "abnormal":
        return <AlertCircle className="w-4 h-4 text-status-abnormal" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium"
    switch (status) {
      case "normal":
        return `${baseClasses} bg-status-normal/10 text-status-normal`
      case "borderline":
        return `${baseClasses} bg-status-borderline/10 text-status-borderline`
      case "abnormal":
        return `${baseClasses} bg-status-abnormal/10 text-status-abnormal`
      default:
        return baseClasses
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Test Results</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-semibold text-foreground">Test Name</th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">Value</th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">Normal Range</th>
              <th className="text-left py-3 px-2 font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.name} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-2 text-foreground">{result.name}</td>
                <td className="py-3 px-2 text-foreground font-medium">
                  {result.value} {result.unit}
                </td>
                <td className="py-3 px-2 text-muted-foreground">{result.normalRange}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className={getStatusBadge(result.status)}>
                      {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
