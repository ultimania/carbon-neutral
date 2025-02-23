import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Departments
  const department1 = await prisma.department.create({
    data: { name: 'Engineering' },
  });

  const department2 = await prisma.department.create({
    data: { name: 'Marketing' },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      departmentId: department1.id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      departmentId: department2.id,
    },
  });

  // Create Payments
  const payment1 = await prisma.payment.create({
    data: {
      amount: 100,
      item: 'Laptop',
      paymentDate: new Date(),
      userInChargeId: user1.id,
      provider: 'Apple',
    },
  });

  const payment2 = await prisma.payment.create({
    data: {
      amount: 200,
      item: 'Monitor',
      paymentDate: new Date(),
      userInChargeId: user2.id,
      provider: 'Dell',
    },
  });

  // Create Workflows
  await prisma.workflow.create({
    data: {
      paymentId: payment1.id,
      requestedById: user1.id,
      status: 'Pending',
      approvedById: user2.id,
      type: 'Purchase',
      typeIcon: '🛒',
    },
  });

  await prisma.workflow.create({
    data: {
      paymentId: payment2.id,
      requestedById: user2.id,
      status: 'Approved',
      approvedById: user1.id,
      type: 'Purchase',
      typeIcon: '🛒',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
