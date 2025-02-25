import { PrismaClient } from "@prisma/client";
import { Emission } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymentId } = body as { paymentId: string };
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { fuelType: true },
    });

    // 使用料金と燃料ごとの排出係数に従って排出量を計算
    if (!payment || !payment.fuelType) {
      throw new Error("Payment or fuel type not found");
    }

    const emissionFactor = payment.fuelType.emissionFactor; // Assuming emissionFactor is a property of fuelType
    const usageFee = payment.amount; // Assuming amount is the usage fee
    const emissionWeight = usageFee * emissionFactor;

    const emissionData = {
      data: {
        paymentId: paymentId,
        weight: emissionWeight,
      },
    };
    const result = await prisma.emission.create(emissionData);

    return new Response(JSON.stringify({ data: result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating emission:", error);
    throw error;
  }
}
