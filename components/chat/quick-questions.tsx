"use client"

import { MessageSquare } from "lucide-react"

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
    <div className="px-4 py-3 border-t bg-card">
      <p className="text-xs font-semibold text-muted-foreground mb-2">Quick Questions</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onSelectQuestion(question)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs hover:bg-secondary/80 transition-colors"
          >
            <MessageSquare className="w-3 h-3" />
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
