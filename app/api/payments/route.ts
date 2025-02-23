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
        requestedBy: {
          include: { department: true },
        },
      },
    });

    const data = workflows.map(workflow => ({
      amount: workflow.payment.amount,
      item: workflow.payment.item,
      paymentDate: workflow.payment.paymentDate.toLocaleDateString(),
      personInCharge: workflow.requestedBy.name,
      approvalDate: workflow.approvalDate ? workflow.approvalDate.toLocaleDateString() : null,
      status: workflow.status,
      department: workflow.requestedBy.departmentId ? workflow.requestedBy.department.name : null,
    }));

    return new Response(JSON.stringify({ data: data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
}