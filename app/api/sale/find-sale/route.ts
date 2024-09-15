import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const res = await prisma.sale.findMany({
      include: {
        order: {
          select: {
            so_number: true,
            product_type: true,
            prize: true,
            order_date: true,
            custumer: true,
            type: true,
            quantity: true,
          },
        },
      },
      where: {
        id: reqBody,
      },
    });

    return NextResponse.json({
      data: res,
    });
  } catch (error) {
    console.log(error);
  }
}
