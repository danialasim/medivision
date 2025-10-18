import { Card } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, Info } from "lucide-react"

interface AbnormalValue {
  name: string
  value: number
  normalRange: string
  severity: "low" | "medium" | "high"
  explanation: string
}

interface AbnormalValuesProps {
  values: AbnormalValue[]
}

export function AbnormalValues({ values }: AbnormalValuesProps) {
  if (values.length === 0) {
    return null
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "medium":
        return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
      case "high":
        return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <Info className="w-5 h-5" />
      case "medium":
        return <AlertCircle className="w-5 h-5" />
      case "high":
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  return (
    <Card className="p-6 border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-900/10 dark:to-orange-900/10 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Abnormal Values Detected</h2>
          <p className="text-sm text-muted-foreground">
            {values.length} value{values.length > 1 ? "s" : ""} requiring attention
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {values.map((value, index) => (
          <div
            key={value.name}
            className={`p-5 rounded-xl border-2 transition-all hover:shadow-md ${getSeverityColor(value.severity)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getSeverityIcon(value.severity)}
                <h3 className="font-bold text-foreground">{value.name}</h3>
              </div>
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-full bg-white/50 dark:bg-black/20">
                {value.severity}
              </span>
            </div>
            <div className="mb-3 flex items-center gap-4 text-sm">
              <span className="font-semibold text-foreground">
                Current: <span className="text-lg">{value.value}</span>
              </span>
              <span className="text-muted-foreground">Normal: {value.normalRange}</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed bg-white/50 dark:bg-black/20 p-3 rounded-lg">
              {value.explanation}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
