"use client"

import { MessageSquare, Sparkles } from "lucide-react"

interface QuickQuestionsProps {
  onSelectQuestion: (question: string) => void
}

const questions = [
  "What causes this abnormal value?",
  "Home remedies?",
  "Which doctor should I see?",
  "Is this urgent?",
]

export default function QuickQuestions({ onSelectQuestion }: QuickQuestionsProps) {
  return (
    <div className="px-4 md:px-6 py-5 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
            Quick Questions
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Get instant answers
          </span>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {questions.map((question, index) => (
            <button
              key={question}
              onClick={() => onSelectQuestion(question)}
              className="group flex items-center gap-3 px-4 py-3.5 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/30 dark:hover:to-purple-950/30 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 rounded-xl transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 group-hover:from-blue-200 group-hover:to-purple-200 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 transition-colors">
                <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white text-left transition-colors">
                {question}
              </span>
            </button>
          ))}
        </div>

        {/* Helper Text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
          Click any question to start the conversation
        </p>
      </div>
    </div>
  )
}
