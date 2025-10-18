import type React from "react"
import "./globals.css"
import { ReportProvider } from "@/lib/report-context"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "next-themes"
import { geistSans } from "./fonts"
import { Navbar } from "@/components/navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`} suppressHydrationWarning>
        <ReportProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </ReportProvider>
      </body>
    </html>
  )
}
