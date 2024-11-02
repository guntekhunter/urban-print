import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const res = await prisma.order.findMany({
      include: {
        Status: true,
      },
      where: {
        id_operator: reqBody.id,
        order_date: reqBody.order_date,
      },
    });
    const resLate = await prisma.order.findMany({
      include: {
        Status: true,
      },
      where: {
        id_operator: reqBody.id,
        order_date: reqBody.order_date,
        status: 5,
      },
    });
    return NextResponse.json({
      data: res.length,
      late: resLate.length,
    });
  } catch (error) {
    console.log(error);
  }
}
