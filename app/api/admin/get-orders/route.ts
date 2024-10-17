import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const { custumer, product_type, status } = reqBody;
  const orders = await prisma.order.findMany({
    where: {
      custumer,
      product_type,
      status,
    },
  });
  return NextResponse.json({ data: orders });
}
