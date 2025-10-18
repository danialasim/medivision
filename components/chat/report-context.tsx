import { FileText, Calendar, AlertCircle } from "lucide-react"

export default function ReportContext() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-b border-blue-100 dark:border-blue-900/50 px-4 md:px-6 py-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          {/* Report Type */}
          <div className="flex items-center gap-2.5 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900">
            <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-gray-100">Blood Test</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2.5 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900">
            <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/50">
              <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Oct 15, 2025</span>
          </div>

          {/* Abnormal Values */}
          <div className="flex items-center gap-2.5 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 px-4 py-2 rounded-xl shadow-sm border border-orange-200 dark:border-orange-900">
            <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/50">
              <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="font-semibold text-orange-900 dark:text-orange-200">
              3 Abnormal Values
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
