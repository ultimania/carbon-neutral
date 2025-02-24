import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");

  const workflows = await prisma.workflow.findMany({
    where: status ? { status } : {},
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, approvedByName } = body;
    
    // Get the user ID from the approvedByName
    const approvedBy = await prisma.user.findFirst({
      where: { name: approvedByName },
    });
    const approvedById = approvedBy?.id;

    const workflow = await prisma.workflow.update({
      where: { id },
      data: { 
        status: status, 
        approvedById: approvedById,
        approvalDate: new Date(), 
      },
    });

    return new Response(JSON.stringify({ data: workflow }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating workflow:", error);
    throw error;
  }
}
