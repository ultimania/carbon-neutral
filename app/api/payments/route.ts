import { PrismaClient } from '@prisma/client';

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
      item: workflow.payment.item,
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
    const data = {
      data: {
        amount: body.amount,
        item: body.item,
        paymentDate: new Date(body.paymentDate),
        userInChargeId: '0',
        status: '仮登録',
        departmentId: '0',
      },
    };
    await prisma.payment.create(data);

    return new Response(JSON.stringify({ message: 'Success' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}