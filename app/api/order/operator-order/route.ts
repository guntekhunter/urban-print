import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const orders = await prisma.order.findMany({
    where: {
      id: reqBody.id,
    },
    include: {
      Status: true,
    },
    take: 32000,
  });
  return NextResponse.json({ data: orders });
}
