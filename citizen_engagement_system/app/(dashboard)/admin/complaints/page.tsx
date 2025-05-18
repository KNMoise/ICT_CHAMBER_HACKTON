import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { formatDate, statusColors, categoryIcons } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default async function AdminComplaintsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (session.user.role === "CITIZEN") {
    redirect("/dashboard/complaints")
  }

  const complaints = await db.complaint.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  })

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Complaints</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complaints</CardTitle>
          <CardDescription>View and manage all citizen complaints</CardDescription>
        </CardHeader>
        <CardContent>
          {complaints.length === 0 ? (
            <p className="text-muted-foreground">No complaints submitted yet.</p>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{categoryIcons[complaint.category]}</div>
                    <div>
                      <Link href={`/admin/complaints/${complaint.id}`}>
                        <h3 className="font-medium hover:underline">{complaint.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        By {complaint.user.name} on {formatDate(complaint.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusColors[complaint.status]
                      }`}
                    >
                      {complaint.status.replace("_", " ")}
                    </span>
                    <Link href={`/admin/complaints/${complaint.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
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
