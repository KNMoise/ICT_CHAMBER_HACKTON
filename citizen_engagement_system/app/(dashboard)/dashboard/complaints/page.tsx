
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDate, statusColors, categoryIcons } from "@/lib/utils"

export default async function ComplaintsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (session.user.role !== "CITIZEN") {
    redirect("/admin/complaints")
  }

  const complaints = await db.complaint.findMany({
    where: {
      user_id: session.user.id,
    },
    orderBy: {
      created_at: "desc",
    },
  })

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Complaints</h1>
        <Link href="/dashboard/complaints/new">
          <Button>Submit New Complaint</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Complaints</CardTitle>
          <CardDescription>View and manage all your submitted complaints</CardDescription>
        </CardHeader>
        <CardContent>
          {complaints.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">You haven't submitted any complaints yet.</p>
              <Link href="/dashboard/complaints/new">
                <Button>Submit Your First Complaint</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{categoryIcons[complaint.category]}</div>
                    <div>
                      <Link href={`/dashboard/complaints/${complaint.id}`}>
                        <h3 className="font-medium hover:underline">{complaint.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{formatDate(complaint.created_at)}</p>
                    </div>
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
        </CardContent>
      </Card>
    </div>
  )
}
