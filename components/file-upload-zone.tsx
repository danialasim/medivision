"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, Loader2, FileImage, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReport } from "@/lib/report-context"
import { useRouter } from "next/navigation"

export function FileUploadZone() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setAnalysis, setUploadedImage } = useReport()
  const router = useRouter()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      processFile(droppedFiles[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0])
    }
  }

  const processFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      setUploadProgress(0)

      const reader = new FileReader()
      reader.onloadstart = () => {
        setUploadProgress(20)
      }
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          setUploadProgress(progress)
        }
      }
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
        setUploadProgress(100)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      alert("Please upload an image file (PNG, JPG, etc.)")
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAnalyzeReport = async () => {
    if (!preview) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData: preview }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze report")
      }

      const { analysis, demoMode, reason } = await response.json()
      setAnalysis(analysis)
      setUploadedImage(preview)

      // Show appropriate notification
      const toast = (await import("react-hot-toast")).default
      
      if (demoMode) {
        if (reason === "quota_exceeded") {
          toast.error(
            "⚠️ OpenAI API quota exceeded. Using demo data for demonstration purposes. Please check your billing at platform.openai.com",
            {
              duration: 6000,
              position: "top-center",
              style: {
                background: "#FEF3C7",
                color: "#92400E",
                fontWeight: "500",
                maxWidth: "600px",
              },
            }
          )
        } else {
          toast("ℹ️ Running in demo mode with sample data", {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#DBEAFE",
              color: "#1E40AF",
              fontWeight: "500",
            },
          })
        }
      } else {
        toast.success("✅ Report analyzed successfully with AI!", {
          duration: 3000,
          position: "top-center",
          icon: "🎉",
        })
      }

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error analyzing report:", error)
      const toast = (await import("react-hot-toast")).default
      toast.error("Failed to analyze report. Please try again.", {
        duration: 4000,
        position: "top-center",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10 -z-10" />
      
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Upload Your Medical Report
          </h2>
          <p className="text-muted-foreground text-lg">
            Get instant AI-powered analysis in seconds
          </p>
        </div>

        {!preview ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 cursor-pointer group ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-[1.02] shadow-2xl shadow-blue-500/20"
                : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:shadow-xl"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload medical report"
            />

            <div onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-6">
              {/* Icon */}
              <div className={`p-6 rounded-full transition-all duration-300 ${
                isDragging 
                  ? "bg-blue-500 scale-110" 
                  : "bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 group-hover:rotate-6"
              }`}>
                <Upload className="w-12 h-12 text-white" />
              </div>

              {/* Text */}
              <div className="space-y-2">
                <p className="text-xl font-bold text-foreground">
                  {isDragging ? "Drop your file here" : "Drag and drop your report here"}
                </p>
                <p className="text-base text-muted-foreground">
                  or <span className="text-blue-600 dark:text-blue-400 font-semibold">click to browse</span> your files
                </p>
              </div>

              {/* Supported formats */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
                <FileImage className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  PNG, JPG, JPEG (up to 10MB)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Preview card */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 shadow-xl">
              {/* Success badge */}
              {uploadProgress === 100 && !isAnalyzing && (
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500 text-white text-sm font-medium shadow-lg z-10 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ready</span>
                </div>
              )}

              {/* Remove button */}
              <button
                onClick={clearFile}
                disabled={isAnalyzing}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10 shadow-lg"
                aria-label="Remove uploaded file"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image preview */}
              <div className="mt-4">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview of uploaded medical report"
                  className="w-full h-auto max-h-[500px] object-contain rounded-2xl shadow-lg"
                />
              </div>

              {/* File info */}
              {file && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <FileImage className="w-4 h-4" />
                  <span className="font-medium">{file.name}</span>
                  <span className="text-gray-400">•</span>
                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-base font-semibold border-2 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                disabled={isAnalyzing}
              >
                <Upload className="w-5 h-5 mr-2" />
                Change File
              </Button>

              <Button
                onClick={handleAnalyzeReport}
                disabled={isAnalyzing}
                size="lg"
                className="flex-1 h-14 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Your Report...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </div>

            {/* Analyzing message */}
            {isAnalyzing && (
              <div className="text-center p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 animate-fade-in">
                <p className="text-blue-700 dark:text-blue-300 font-medium">
                  Our AI is analyzing your medical report. This may take a few moments...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
