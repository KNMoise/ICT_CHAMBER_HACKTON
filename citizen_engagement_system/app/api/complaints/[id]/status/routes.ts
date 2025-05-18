import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import * as z from "zod"

const statusSchema = z.object({
  status: z.enum(["PENDING", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "REJECTED"]),
})

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Only officials and admins can update status
    if (session.user.role === "CITIZEN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()
    const { status } = statusSchema.parse(body)

    const complaint = await db.complaint.update({
      where: {
        id: params.id,
      },
      data: {
        status,
        assignedTo: session.user.id,
      },
    })

    return NextResponse.json({ message: "Status updated successfully", complaint }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request data", errors: error.errors }, { status: 422 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
