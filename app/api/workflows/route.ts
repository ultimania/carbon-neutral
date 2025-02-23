import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const requests = await prisma.workflow.findMany()
    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch requests" })
  } finally {
    await prisma.$disconnect()
  }
}
