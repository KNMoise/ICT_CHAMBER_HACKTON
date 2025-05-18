import { db } from "@/lib/db"
import { hash } from "bcrypt"

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 10)
  const admin = await db.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
      department: "Administration",
    },
  })

  // Create official users
  const officialPassword = await hash("official123", 10)
  const roadOfficial = await db.user.upsert({
    where: { email: "roads@example.com" },
    update: {},
    create: {
      email: "roads@example.com",
      name: "Roads Department",
      password: officialPassword,
      role: "OFFICIAL",
      department: "Roads",
    },
  })

  const waterOfficial = await db.user.upsert({
    where: { email: "water@example.com" },
    update: {},
    create: {
      email: "water@example.com",
      name: "Water Department",
      password: officialPassword,
      role: "OFFICIAL",
      department: "Water",
    },
  })

  // Create citizen users
  const citizenPassword = await hash("citizen123", 10)
  const citizen1 = await db.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      email: "john@example.com",
      name: "John Doe",
      password: citizenPassword,
      role: "CITIZEN",
    },
  })

  const citizen2 = await db.user.upsert({
    where: { email: "jane@example.com" },
    update: {},
    create: {
      email: "jane@example.com",
      name: "Jane Smith",
      password: citizenPassword,
      role: "CITIZEN",
    },
  })

  // Create sample complaints
  const complaint1 = await db.complaint.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      title: "Pothole on Main Street",
      description:
        "There is a large pothole on Main Street near the intersection with Oak Avenue. It's causing damage to vehicles and is a safety hazard.",
      category: "ROADS",
      status: "PENDING",
      location: "Main Street and Oak Avenue",
      user_id: citizen1.id,
    },
  })

  const complaint2 = await db.complaint.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      title: "Water outage in Downtown",
      description:
        "There has been no water supply in the Downtown area for the past 24 hours. Many residents are affected.",
      category: "WATER",
      status: "IN_PROGRESS",
      location: "Downtown residential area",
      user_id: citizen2.id,
      assigned_to: waterOfficial.id,
    },
  })

  const complaint3 = await db.complaint.upsert({
    where: { id: "3" },
    update: {},
    create: {
      id: "3",
      title: "Streetlight not working",
      description:
        "The streetlight at the corner of Pine Street and Elm Road has been out for over a week, making the area unsafe at night.",
      category: "ELECTRICITY",
      status: "RESOLVED",
      location: "Pine Street and Elm Road",
      user_id: citizen1.id,
      assigned_to: admin.id,
    },
  })

  // Create sample responses
  await db.response.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      content:
        "We have received your complaint about the water outage in Downtown. Our team is investigating the issue and working to restore service as soon as possible.",
      complaint_id: complaint2.id,
      official_id: waterOfficial.id,
    },
  })

  await db.response.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      content:
        "The streetlight issue has been fixed. A maintenance crew replaced the bulb and repaired a wiring issue. Please let us know if you notice any further problems.",
      complaint_id: complaint3.id,
      official_id: admin.id,
    },
  })

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
