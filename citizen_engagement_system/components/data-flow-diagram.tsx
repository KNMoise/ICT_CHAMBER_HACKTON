"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, FileText, MessageSquare, Send, Server, User, UserCog } from "lucide-react"

export default function DataFlowDiagram() {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="submission">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submission">Complaint Submission</TabsTrigger>
            <TabsTrigger value="handling">Complaint Handling</TabsTrigger>
          </TabsList>

          <TabsContent value="submission" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <User size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Citizen submits complaint</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Server size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">API Gateway validates request</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                  <MessageSquare size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Complaint Management Service processes submission</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <FileText size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Categorization Service classifies complaint</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Server size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Complaint stored in database</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <Send size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Notification sent to citizen</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <Send size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Agency notified about new complaint</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="handling" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <UserCog size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Agency official logs into dashboard</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Server size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System displays assigned complaints</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <UserCog size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Official reviews and updates status</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Server size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Changes persisted to database</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <Send size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Notification Service alerts citizen</p>
                </div>
              </div>
              <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                <ArrowRight size={16} className="ml-[-20px] text-muted-foreground" />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <User size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Citizen views updates via tracking interface</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
