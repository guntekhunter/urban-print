import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const id = reqBody.id;
  try {
    const onProgress = await prisma.order.count({
      where: { id_operator: id, status: 3 },
    });

    const finish = await prisma.order.count({
      where: { id_operator: id, status: { not: 1 } },
    });

    const late = await prisma.order.count({
      where: { id_operator: id, late: true },
    });

    const count = await prisma.order.count({
      where: { id_operator: id, status: { not: 1 } },
    });

    const countTotal = count - late;
    const performance = Math.round(count > 0 ? (countTotal / count) * 100 : 0);
    return NextResponse.json({
      data: performance,
    });
  } catch (error) {
    console.log(error);
  }
}
