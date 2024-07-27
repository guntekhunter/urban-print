import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const id = reqBody.id;
  const status = reqBody.status;
  const operator = reqBody.operator;
  try {
    await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status,
        id_operator: operator,
      },
    });

    const getOrder = await prisma.order.findMany({
      include: {
        Status: true,
      },
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      data: getOrder,
    });
  } catch (error) {
    console.log(error);
  }
}
