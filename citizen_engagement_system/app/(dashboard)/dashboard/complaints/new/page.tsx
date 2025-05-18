import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NewComplaintForm } from "@/components/new-complaint-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewComplaintPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (session.user.role !== "CITIZEN") {
    redirect("/admin")
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Link href="/dashboard/complaints">
          <Button variant="outline" size="sm" className="mr-4">
            Back to Complaints
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Submit New Complaint</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Complaint Details</CardTitle>
          <CardDescription>Provide details about your complaint to help us address it effectively</CardDescription>
        </CardHeader>
        <CardContent>
          <NewComplaintForm userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  )
}
