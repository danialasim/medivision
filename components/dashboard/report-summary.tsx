import { Card } from "@/components/ui/card"
import { FileText, Calendar } from "lucide-react"

interface ReportSummaryProps {
  type: string
  date: string
}

export function ReportSummary({ type, date }: ReportSummaryProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Report Summary</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Report Type</p>
            <p className="text-foreground font-medium">{type}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">Analysis Date</p>
            <p className="text-foreground font-medium">{formattedDate}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
