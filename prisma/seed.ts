import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // truncate all tables
  await prisma.emission.deleteMany();
  await prisma.workflow.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.fuelType.deleteMany();
  await prisma.user.deleteMany();
  await prisma.office.deleteMany();
  await prisma.department.deleteMany();

  // Create Departments
  const department1 = await prisma.department.create({
    data: { name: 'Engineering' },
  });

  const department2 = await prisma.department.create({
    data: { name: 'Marketing' },
  });

  // Create Offices
  const office1 = await prisma.office.create({
    data: {
      name: 'Headquarters',
      address1: '123 Main St',
      address2: 'Suite 100',
      address3: 'City, Country',
    },
  });

  const office2 = await prisma.office.create({
    data: {
      name: 'Branch Office',
      address1: '456 Side St',
      address2: 'Suite 200',
      address3: 'City, Country',
    },
  });

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      departmentId: department1.id,
      officeId: office1.id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      departmentId: department2.id,
      officeId: office2.id,
    },
  });

  // Create FuelTypes
  const fuelType1 = await prisma.fuelType.create({
    data: { name: '電気', emissionFactor: 0.5 },
  });

  const fuelType2 = await prisma.fuelType.create({
    data: { name: 'ガス', emissionFactor: 1.2 },
  });

  const fuelType3 = await prisma.fuelType.create({
    data: { name: 'ガソリン', emissionFactor: 2.3 },
  });

  const fuelType4 = await prisma.fuelType.create({
    data: { name: '軽油', emissionFactor: 2.7 },
  });

  const fuelType5 = await prisma.fuelType.create({
    data: { name: '灯油', emissionFactor: 2.1 },
  });

  // Create Providers
  const provider1 = await prisma.provider.create({
    data: {
      name: '東京電力',
      fuelTypeId: fuelType1.id,
      officeId: office1.id,
    },
  });

  const provider2 = await prisma.provider.create({
    data: {
      name: '東京ガス',
      fuelTypeId: fuelType2.id,
      officeId: office2.id,
    },
  });

  const provider3 = await prisma.provider.create({
    data: {
      name: 'ENEOS',
      fuelTypeId: fuelType3.id,
      officeId: office1.id,
    },
  });

  // Create Payments
  const payment1 = await prisma.payment.create({
    data: {
      amount: 100,
      fuelTypeId: fuelType1.id,
      provider: provider1.name,
      paymentDate: new Date(),
      userInChargeId: user1.id,
    },
  });

  const payment2 = await prisma.payment.create({
    data: {
      amount: 200,
      fuelTypeId: fuelType2.id,
      provider: provider2.name,
      paymentDate: new Date(),
      userInChargeId: user2.id,
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
