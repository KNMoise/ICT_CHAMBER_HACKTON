import { Card, CardContent } from "@/components/ui/card"
import { Clock, ShieldCheck, Zap, Smile } from "lucide-react"

export default function QualityAttributes() {
  const attributes = [
    {
      name: "Availability",
      icon: Clock,
      metrics: ["Target uptime: 99.9%", "Redundancy in critical components", "Graceful degradation strategies"],
    },
    {
      name: "Performance",
      icon: Zap,
      metrics: [
        "Page load time: < 2 seconds",
        "API response time: < 500ms for 95% of requests",
        "Search functionality: < 1 second for results",
      ],
    },
    {
      name: "Security",
      icon: ShieldCheck,
      metrics: ["OWASP Top 10 compliance", "Regular security audits", "Data retention policies compliance"],
    },
    {
      name: "Usability",
      icon: Smile,
      metrics: ["WCAG 2.1 AA compliance", "Multi-language support", "Mobile-responsive design"],
    },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {attributes.map((attribute) => (
            <div key={attribute.name} className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-3">
                <attribute.icon className="h-5 w-5 text-primary" />
                <h4 className="font-medium">{attribute.name}</h4>
              </div>
              <ul className="space-y-1 text-sm">
                {attribute.metrics.map((metric, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {metric}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
