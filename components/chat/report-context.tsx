import { FileText, Calendar, Stethoscope } from "lucide-react"

export default function ReportContext() {
  return (
    <div className="bg-secondary/50 border-b px-4 py-3">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="font-medium">Blood Test</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span>Oct 15, 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-primary" />
          <span>3 Abnormal Values</span>
        </div>
      </div>
    </div>
  )
}
