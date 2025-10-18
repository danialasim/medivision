import { Card } from "@/components/ui/card"
import { Stethoscope } from "lucide-react"

interface Specialist {
  type: string
  reason: string
}

interface SpecialistSuggestionsProps {
  specialists: Specialist[]
}

export function SpecialistSuggestions({ specialists }: SpecialistSuggestionsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Stethoscope className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Recommended Specialists</h2>
      </div>
      <div className="space-y-3">
        {specialists.map((specialist, index) => (
          <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <h3 className="font-semibold text-foreground mb-1">{specialist.type}</h3>
            <p className="text-sm text-muted-foreground">{specialist.reason}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
