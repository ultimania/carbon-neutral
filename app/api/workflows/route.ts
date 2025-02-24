import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const workflows = await prisma.workflow.findMany({
    include: {
      payment: true,
      requestedBy: true,
    },
  });

  return new Response(JSON.stringify({ data: workflows }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const workflowData = {
      data: {
        paymentId: body.payment.data.id,
        requestedById: body.payment.data.userInChargeId,
        status: body.status,
        approvedById: body.approvedById || null,
        type: body.type,
        typeIcon: body.typeIcon,
      },
    };
    const result = await prisma.workflow.create(workflowData);

    return new Response(JSON.stringify({ data: result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}
