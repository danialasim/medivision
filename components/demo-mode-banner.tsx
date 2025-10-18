import { AlertCircle, ExternalLink } from "lucide-react"

export function DemoModeBanner() {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-2xl p-6 mb-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-yellow-400 dark:bg-yellow-600">
          <AlertCircle className="w-6 h-6 text-yellow-900 dark:text-yellow-100" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-yellow-900 dark:text-yellow-100 mb-2">
            Demo Mode Active
          </h3>
          <p className="text-yellow-800 dark:text-yellow-200 mb-3 leading-relaxed">
            Your OpenAI API quota has been exceeded. The analysis below is using sample demo data for
            demonstration purposes. To analyze real medical reports, please add credits to your OpenAI account.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://platform.openai.com/settings/organization/billing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Add Credits to OpenAI
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://platform.openai.com/docs/guides/error-codes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-yellow-600 text-yellow-900 dark:text-yellow-100 rounded-lg font-medium transition-colors hover:bg-yellow-50 dark:hover:bg-gray-700"
            >
              Learn More
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
