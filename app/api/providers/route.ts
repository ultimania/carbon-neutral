// DBからproviderを取得して返すようなGETリクエストを追加
import prisma from "@/lib/prisma";

export async function GET(
  request: Request
) {
try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    // リクエストパラメタにemailが含まれていた場合は、
    // そのユーザーが在籍するofficeIdでproviderをフィルタリングする。
    let filter = {};
    if (email) {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { officeId: true },
        });
        if (user && user.officeId) {
            filter = { officeId: user.officeId };
        }
    }

    const providers = await prisma.provider.findMany({
        where: filter,
    });

    return new Response(JSON.stringify({ data: providers }), {
        headers: { 'Content-Type': 'application/json' },
    });
} catch (error) {
    console.error('Error fetching providers:', error);
    throw error;
}
}