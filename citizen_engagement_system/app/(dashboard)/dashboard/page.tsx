import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDate, statusColors } from "@/lib/utils"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (session.user.role !== "CITIZEN") {
    redirect("/admin")
  }

  const complaints = await db.complaint.findMany({
    where: {
      user_id: session.user.id,
    },
    orderBy: {
      created_at: "desc",
    },
    take: 5,
  })

  const stats = {
    total: await db.complaint.count({
      where: {
        user_id: session.user.id,
      },
    }),
    pending: await db.complaint.count({
      where: {
        user_id: session.user.id,
        status: "PENDING",
      },
    }),
    inProgress: await db.complaint.count({
      where: {
        user_id: session.user.id,
        status: "IN_PROGRESS",
      },
    }),
    resolved: await db.complaint.count({
      where: {
        user_id: session.user.id,
        status: "RESOLVED",
      },
    }),
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Citizen Dashboard</h1>
        <Link href="/dashboard/complaints/new">
          <Button>Submit New Complaint</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolved}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
          <CardDescription>Your most recently submitted complaints</CardDescription>
        </CardHeader>
        <CardContent>
          {complaints.length === 0 ? (
            <p className="text-muted-foreground">No complaints submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Link href={`/dashboard/complaints/${complaint.id}`}>
                      <h3 className="font-medium hover:underline">{complaint.title}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{formatDate(complaint.created_at)}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusColors[complaint.status]
                      }`}
                    >
                      {complaint.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {complaints.length > 0 && (
            <div className="mt-4">
              <Link href="/dashboard/complaints">
                <Button variant="outline" size="sm">
                  View All Complaints
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
