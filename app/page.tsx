import { Hero } from "@/components/hero"
import { FileUploadZone } from "@/components/file-upload-zone"
import { FeatureCards } from "@/components/feature-cards"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
      <Hero />
      <FileUploadZone />
      <FeatureCards />
    </main>
  )
}
