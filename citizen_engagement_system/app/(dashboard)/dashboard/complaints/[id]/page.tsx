import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDate, statusColors, categoryIcons } from "@/lib/utils"

interface ComplaintDetailPageProps {
  params: {
    id: string
  }
}

export default async function ComplaintDetailPage({ params }: ComplaintDetailPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const complaint = await db.complaint.findUnique({
    where: {
      id: params.id,
    },
    include: {
      responses: {
        include: {
          official: true,
        },
        orderBy: {
          created_at: "asc",
        },
      },
    },
  })

  if (!complaint) {
    notFound()
  }

  // Check if the user is authorized to view this complaint
  if (session.user.role === "CITIZEN" && complaint.user_id !== session.user.id) {
    redirect("/dashboard/complaints")
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Link href={session.user.role === "CITIZEN" ? "/dashboard/complaints" : "/admin/complaints"}>
          <Button variant="outline" size="sm" className="mr-4">
            Back to Complaints
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Complaint Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{complaint.title}</CardTitle>
                  <CardDescription>Submitted on {formatDate(complaint.created_at)}</CardDescription>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusColors[complaint.status]
                  }`}
                >
                  {complaint.status.replace("_", " ")}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Description</h3>
                  <p className="whitespace-pre-line">{complaint.description}</p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-1">Category</h3>
                    <p className="flex items-center gap-2">
                      <span>{categoryIcons[complaint.category]}</span>
                      {complaint.category}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-1">Location</h3>
                    <p>{complaint.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responses</CardTitle>
              <CardDescription>Official responses to your complaint</CardDescription>
            </CardHeader>
            <CardContent>
              {complaint.responses.length === 0 ? (
                <p className="text-muted-foreground">No responses yet.</p>
              ) : (
                <div className="space-y-6">
                  {complaint.responses.map((response) => (
                    <div key={response.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">
                          {response.official.name}{" "}
                          <span className="text-muted-foreground text-sm">({response.official.department})</span>
                        </h3>
                        <p className="text-sm text-muted-foreground">{formatDate(response.created_at)}</p>
                      </div>
                      <p className="whitespace-pre-line">{response.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Status Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Complaint Submitted</p>
                    <p className="text-sm text-muted-foreground">{formatDate(complaint.created_at)}</p>
                  </div>
                </div>

                {complaint.status !== "PENDING" && (
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium">Complaint Assigned</p>
                      <p className="text-sm text-muted-foreground">{formatDate(complaint.updated_at)}</p>
                    </div>
                  </div>
                )}

                {complaint.status === "IN_PROGRESS" && (
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                      ⟳
                    </div>
                    <div>
                      <p className="font-medium">In Progress</p>
                      <p className="text-sm text-muted-foreground">{formatDate(complaint.updated_at)}</p>
                    </div>
                  </div>
                )}

                {complaint.status === "RESOLVED" && (
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium">Resolved</p>
                      <p className="text-sm text-muted-foreground">{formatDate(complaint.updated_at)}</p>
                    </div>
                  </div>
                )}

                {complaint.status === "REJECTED" && (
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700">
                      ✕
                    </div>
                    <div>
                      <p className="font-medium">Rejected</p>
                      <p className="text-sm text-muted-foreground">{formatDate(complaint.updated_at)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
