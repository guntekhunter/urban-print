import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const orders = await prisma.order.findFirst({
    where: {
      id: reqBody,
    },
  });
  return NextResponse.json({ data: orders });
}
