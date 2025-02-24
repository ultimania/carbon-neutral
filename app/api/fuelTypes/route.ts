import prisma from "@/lib/prisma";

// DBからfuelTypesを取得するためのGETメソッドを定義
export async function GET(request: Request) {
  try {
    const fuelTypes = await prisma.fuelType.findMany();
    return new Response(JSON.stringify({ data: fuelTypes }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching fuelTypes:", error);
    throw error;
  }
}
