import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import * as z from "zod"

const responseSchema = z.object({
  content: z.string().min(10),
  complaintId: z.string(),
  officialId: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Only officials and admins can add responses
    if (session.user.role === "CITIZEN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()
    const { content, complaintId, officialId } = responseSchema.parse(body)

    // Ensure the official can only create responses for themselves
    if (session.user.id !== officialId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const response = await db.response.create({
      data: {
        content,
        complaintId,
        officialId,
      },
    })

    // Update complaint status to IN_PROGRESS if it's PENDING or ASSIGNED
    const complaint = await db.complaint.findUnique({
      where: {
        id: complaintId,
      },
    })

    if (complaint && (complaint.status === "PENDING" || complaint.status === "ASSIGNED")) {
      await db.complaint.update({
        where: {
          id: complaintId,
        },
        data: {
          status: "IN_PROGRESS",
          assignedTo: officialId,
        },
      })
    }

    return NextResponse.json({ message: "Response added successfully", response }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request data", errors: error.errors }, { status: 422 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
