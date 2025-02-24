import { PrismaClient } from '@prisma/client';
import { TypeIcon } from 'lucide-react';

const prisma = new PrismaClient();

export async function GET(
  request: Request
) {
  try {
    // PaymentsとUsersとWorkflowsのデータを結合して以下のようなデータを取得
    // {
    //   amount: 1000000,
    //   item: '電気代',
    //   paymentDate: '2021-01-01',
    //   personInCharge: '山田太郎',
    //   approvalDate: '2021-01-02',
    //   status: '承認済',
    //   department: '営業部',
    // }
    const workflows = await prisma.workflow.findMany({
      include: {
        payment: true,
        requestedBy: true,
      },
    });

    const data = workflows.map(workflow => ({
      amount: workflow.payment.amount,
      item: workflow.payment.fuelTypeId,
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