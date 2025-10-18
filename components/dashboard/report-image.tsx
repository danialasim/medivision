import { Card } from "@/components/ui/card"
import Image from "next/image"

interface ReportImageProps {
  image: string
}

export function ReportImage({ image }: ReportImageProps) {
  return (
    <Card className="p-4 sticky top-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Uploaded Report</h3>
      <div className="relative w-full aspect-[3/4] bg-muted rounded-lg overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt="Medical report" fill className="object-cover" />
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">Report image preview</p>
    </Card>
  )
}
