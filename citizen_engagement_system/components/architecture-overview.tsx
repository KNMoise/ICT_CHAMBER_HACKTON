"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

export default function ArchitectureOverview() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null)

  const layers = [
    { id: "client", name: "Client Layer", color: "bg-blue-500" },
    { id: "application", name: "Application Services Layer", color: "bg-green-500" },
    { id: "data", name: "Data Management Layer", color: "bg-amber-500" },
    { id: "integration", name: "Integration Layer", color: "bg-purple-500" },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">High-Level Architecture Diagram</h3>
        <TooltipProvider>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl relative">
              {/* Architecture diagram */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-4 rounded-lg border-2 ${activeLayer === "client" ? "border-blue-500" : "border-border"} cursor-pointer transition-colors`}
                      onMouseEnter={() => setActiveLayer("client")}
                      onMouseLeave={() => setActiveLayer(null)}
                    >
                      <div className="h-16 flex items-center justify-center">
                        <span className="font-medium text-center">Client Layer</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>User interfaces for citizens and administrators</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-4 rounded-lg border-2 ${activeLayer === "application" ? "border-green-500" : "border-border"} cursor-pointer transition-colors`}
                      onMouseEnter={() => setActiveLayer("application")}
                      onMouseLeave={() => setActiveLayer(null)}
                    >
                      <div className="h-16 flex items-center justify-center">
                        <span className="font-medium text-center">Application Services Layer</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Core business logic and services</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-4 rounded-lg border-2 ${activeLayer === "data" ? "border-amber-500" : "border-border"} cursor-pointer transition-colors`}
                      onMouseEnter={() => setActiveLayer("data")}
                      onMouseLeave={() => setActiveLayer(null)}
                    >
                      <div className="h-16 flex items-center justify-center">
                        <span className="font-medium text-center">Data Management Layer</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Data persistence, access, and integrity</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Arrows */}
              <div className="flex justify-center mb-4">
                <div className="w-1/2 flex justify-between px-8">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-muted-foreground"></div>
                    <div className="h-0.5 w-16 bg-muted-foreground"></div>
                    <div className="h-8 w-0.5 bg-muted-foreground"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-0.5 bg-muted-foreground"></div>
                    <div className="h-0.5 w-16 bg-muted-foreground"></div>
                    <div className="h-8 w-0.5 bg-muted-foreground"></div>
                  </div>
                </div>
              </div>

              {/* Integration Layer */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`p-4 rounded-lg border-2 ${activeLayer === "integration" ? "border-purple-500" : "border-border"} cursor-pointer transition-colors mx-auto w-2/3`}
                    onMouseEnter={() => setActiveLayer("integration")}
                    onMouseLeave={() => setActiveLayer(null)}
                  >
                    <div className="h-16 flex items-center justify-center">
                      <span className="font-medium text-center">Integration Layer</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Communication between the system and external services</p>
                </TooltipContent>
              </Tooltip>

              {/* Legend */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                {layers.map((layer) => (
                  <div key={layer.id} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${layer.color}`}></div>
                    <span className="text-sm">{layer.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
