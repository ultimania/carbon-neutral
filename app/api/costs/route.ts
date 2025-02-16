import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const payments = await prisma.payment.findMany({
      select: {
        paymentDate: true,
        amount: true,
      },
      where: {
        paymentDate: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
        },
      },
    });

    const monthlyCosts = payments.reduce(
      (acc: { [key: string]: number }, payment) => {
        const monthKey = new Date(payment.paymentDate).toISOString().slice(0, 7);
        acc[monthKey] = (acc[monthKey] || 0) + payment.amount;
        return acc;
      },
      {}
    );

    res.status(200).json({ data: monthlyCosts });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}