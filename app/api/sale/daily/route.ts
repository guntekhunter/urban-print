import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const newSale = await prisma.sale.findMany({
      include: {
        order: {
          select: {
            so_number: true,
            product_type: true,
            prize: true,
            sales_person: true,
          },
        },
      },
      where: {
        sales_id: reqBody.sales_id,
      },
    });
    return NextResponse.json({ data: newSale });
  } catch (error) {
    console.log(error);
  }
}
