import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const allSale = await prisma.sale.findMany({
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
      take: 32000,
    });
    return NextResponse.json({ data: allSale });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const newSale = await prisma.sale.create({
      data: {
        order_id: reqBody.order_id,
        status: reqBody.status,
        date: reqBody.date,
      },
    });
    return NextResponse.json({ data: newSale });
  } catch (error) {
    console.log(error);
  }
}
