import { Card } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

interface RecommendationsProps {
  recommendations: string[]
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Health Recommendations</h2>
      </div>
      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <span className="text-foreground pt-0.5">{rec}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
