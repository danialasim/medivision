import { Card } from "@/components/ui/card"
import { Activity } from "lucide-react"

interface TestResult {
  status: "normal" | "borderline" | "abnormal"
}

interface HealthStatusProps {
  results: TestResult[]
}

export function HealthStatus({ results }: HealthStatusProps) {
  const abnormalCount = results.filter((r) => r.status === "abnormal").length
  const borderlineCount = results.filter((r) => r.status === "borderline").length
  const normalCount = results.filter((r) => r.status === "normal").length

  let overallStatus: "normal" | "borderline" | "abnormal"
  let statusColor: string
  let statusMessage: string

  if (abnormalCount > 0) {
    overallStatus = "abnormal"
    statusColor = "text-status-abnormal"
    statusMessage = "Attention Required"
  } else if (borderlineCount > 0) {
    overallStatus = "borderline"
    statusColor = "text-status-borderline"
    statusMessage = "Monitor Closely"
  } else {
    overallStatus = "normal"
    statusColor = "text-status-normal"
    statusMessage = "Healthy"
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Overall Health Status</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Normal</p>
          <p className="text-2xl font-bold text-status-normal">{normalCount}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Borderline</p>
          <p className="text-2xl font-bold text-status-borderline">{borderlineCount}</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Abnormal</p>
          <p className="text-2xl font-bold text-status-abnormal">{abnormalCount}</p>
        </div>
        <div
          className={`p-4 bg-muted rounded-lg border-2 border-${overallStatus === "normal" ? "status-normal" : overallStatus === "borderline" ? "status-borderline" : "status-abnormal"}`}
        >
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <p className={`text-lg font-bold ${statusColor}`}>{statusMessage}</p>
        </div>
      </div>
    </Card>
  )
}
