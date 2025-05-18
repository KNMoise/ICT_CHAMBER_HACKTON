import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, CircleDashed, CircleDot } from "lucide-react"

export default function RoadmapTimeline() {
  const phases = [
    {
      name: "Phase 1: Core MVP",
      status: "completed",
      features: [
        "Basic authentication system",
        "Complaint submission form",
        "Simple categorization and routing",
        "Status tracking page",
        "Admin response interface",
      ],
    },
    {
      name: "Phase 2: Enhanced Features",
      status: "in-progress",
      features: [
        "Agency-specific dashboards",
        "Document attachments",
        "Advanced search functionality",
        "Basic analytics and reporting",
      ],
    },
    {
      name: "Phase 3: Advanced Capabilities",
      status: "planned",
      features: ["Public API for third-party integrations", "Mobile application", "Comprehensive analytics dashboard"],
    },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-8">
          {phases.map((phase, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline connector */}
              {index < phases.length - 1 && (
                <div className="absolute left-[15px] top-[28px] h-[calc(100%-28px)] w-px bg-border"></div>
              )}

              {/* Status icon */}
              <div className="absolute left-0 top-1">
                {phase.status === "completed" ? (
                  <CheckCircle2 className="h-[30px] w-[30px] text-green-500" />
                ) : phase.status === "in-progress" ? (
                  <CircleDot className="h-[30px] w-[30px] text-blue-500" />
                ) : (
                  <CircleDashed className="h-[30px] w-[30px] text-muted-foreground" />
                )}
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">{phase.name}</h4>
                <div className="mb-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      phase.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : phase.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {phase.status === "completed"
                      ? "Completed"
                      : phase.status === "in-progress"
                        ? "In Progress"
                        : "Planned"}
                  </span>
                </div>
                <ul className="space-y-1">
                  {phase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-muted-foreground">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
