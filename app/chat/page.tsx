"use client"

import { useEffect } from "react"

import { useState, useRef } from "react"
import { Send, Loader2, MessageSquare } from "lucide-react"
import { useReport } from "@/lib/report-context"
import { useRouter } from "next/navigation"
import ChatMessage from "@/components/chat/chat-message"
import QuickQuestions from "@/components/chat/quick-questions"
import ReportContext from "@/components/chat/report-context"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const { analysis, getContextString } = useReport()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your medical AI assistant. I've reviewed your medical report. Feel free to ask me any questions about your results, and I'll provide helpful insights.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/medical-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages
            .map((m) => ({
              role: m.type === "user" ? "user" : "assistant",
              content: m.content,
            }))
            .concat({
              role: "user",
              content: text,
            }),
          reportContext: getContextString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      // Read the streaming response
      const reader = response.body?.getReader()
      if (!reader) throw new Error("No response body")

      let aiContent = ""
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("0:")) {
            const jsonStr = line.slice(2)
            try {
              const data = JSON.parse(jsonStr)
              if (data.type === "text-delta") {
                aiContent += data.delta
              }
            } catch (e) {
              // Skip parsing errors
            }
          }
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiContent || "I apologize, but I couldn't generate a response. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I encountered an error processing your message. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Ensure useEffect is called at the top level
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const [shouldScroll, setShouldScroll] = useState(true)
  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom()
    }
    setShouldScroll(false)
  }, [messages])

  if (!analysis) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-background dark:from-background dark:via-blue-950/10 dark:to-background">
        <div className="text-center max-w-xl px-6 animate-fade-in">
          {/* Icon with glow effect */}
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-4 border-white dark:border-gray-800 shadow-2xl">
              <MessageSquare className="w-20 h-20 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            No Report Loaded
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg leading-relaxed">
            Upload your medical report to unlock AI-powered insights and get instant answers about your health data
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-2">🔍</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Instant Analysis</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-2">💡</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Easy to Understand</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Personalized Advice</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <button
            onClick={() => router.push("/")}
            className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Upload Report
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
      {/* Header - Simple & Clean */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="flex items-center justify-between">
            {/* Left: Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">AI Medical Assistant</h1>
                <p className="text-xs md:text-sm text-blue-100 mt-0.5">
                  Ask questions about your medical report
                </p>
              </div>
            </div>

            {/* Right: Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Context */}
      <ReportContext />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" />
                <span
                  className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <span
                  className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
              <span className="text-sm text-muted-foreground font-medium">AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && <QuickQuestions onSelectQuestion={handleSendMessage} />}

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 md:p-6 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage(input)}
              placeholder="Ask about your medical report..."
              className="flex-1 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Press Enter to send • AI responses are for informational purposes only
          </p>
        </div>
      </div>
    </div>
  )
}
