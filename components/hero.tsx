"use client"

import { Sparkles, Heart, Brain, Activity } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="max-w-5xl mx-auto text-center relative">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800 backdrop-blur-sm shadow-lg animate-fade-in">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            AI-Powered Medical Analysis
          </span>
          <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse delay-300" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-balance leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
            MediVision
          </span>
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl text-foreground/90">
            Your Health, Simplified
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-6 text-balance leading-relaxed font-medium">
          Understand your medical reports in{" "}
          <span className="text-blue-600 dark:text-blue-400 font-bold">seconds</span>
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-12 text-balance leading-relaxed">
          Upload your medical reports and let our advanced AI analyze them instantly. Get clear insights, personalized
          recommendations, and chat with our intelligent AI assistant about your health.
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium">AI Analysis</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium">Instant Insights</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium">Health Guidance</span>
          </div>
        </div>
      </div>
    </section>
  )
}
