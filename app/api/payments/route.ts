import { PrismaClient } from '@prisma/client';
import { TypeIcon } from 'lucide-react';

const prisma = new PrismaClient();

export async function GET(
  request: Request
) {
  try {
    // PaymentsとUsersとWorkflowsのデータを結合して以下のようなデータを取得
    const workflows = await prisma.workflow.findMany({
      include: {
        payment: {
          include: { fuelType: true },
        },
        requestedBy: true,
      },
    });

    const data = workflows.map(workflow => ({
      amount: workflow.payment.amount,
      item: workflow.payment.fuelType.name,
      paymentDate: workflow.payment.paymentDate.toLocaleDateString(),
      personInCharge: workflow.requestedBy.name,
      approvalDate: workflow.approvalDate ? workflow.approvalDate.toLocaleDateString() : null,
      status: workflow.status,
      provider: workflow.payment.provider,
    }));

    return new Response(JSON.stringify({ data: data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();
    // body.fuelTypeを元にfuelTypeIdを取得
    const fuelType = await prisma.fuelType.findFirst({
      where: { name: body.fuelType },
    });
    // body.userInChargeを元にuserInChargeIdを取得
    const userInCharge = await prisma.user.findFirst({
      where: { name: body.userInCharge },
    });

    // paymentテーブルにデータを追加
    const data = {
      data: {
        amount: Number(body.amount),
        fuelTypeId: fuelType?.id || "",
        provider: body.provider,
        paymentDate: new Date(body.paymentDate),
        userInChargeId: userInCharge?.id || "",
        createdAt: new Date(),
      },
    };
    const result = await prisma.payment.create(data);

    // 作成したpayment情報を返す
    return new Response(JSON.stringify({ data: result }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}