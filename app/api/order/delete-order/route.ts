import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const id = reqBody.id;
  try {
    const res = await prisma.order.delete({
      where: {
        id: id,
      },
    });

    const sale = await prisma.sale.findFirst({
      where: {
        order_id: id,
      },
    });

    if (sale) {
      // Delete the sale using its unique id
      await prisma.sale.delete({
        where: {
          id: sale.id,
        },
      });
    }

    const orderData = await prisma.order.findMany({
      include: {
        Status: true,
      },
    });
    return NextResponse.json({
      deletedData: res,
      response: orderData,
    });
  } catch (error) {
    console.log(error);
  }
}
