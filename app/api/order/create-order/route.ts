import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const orders = await prisma.order.findMany({
    include: {
      Status: true,
    },
  });
  return NextResponse.json({ data: orders });
}
export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const newOrder = await prisma.order.create({
      data: {
        so_number: reqBody.so_number,
        quotation_number: reqBody.quotation_number,
        order_date: reqBody.order_date,
        required_date: reqBody.required_date,
        sales_type: reqBody.sales_type,
        po_number: reqBody.po_number,
        acount_rep: reqBody.acount_rep,
        sales_person: reqBody.sales_person,
        custumer: reqBody.custumer,
        contact_person: reqBody.contact_person,
        ship_to: reqBody.ship_to,
        adress: reqBody.adress,
        status: reqBody.status,
        product_type: reqBody.product_type,
        id_operator: reqBody.id_operator,
        user: reqBody.user,
        authorId: reqBody.authorId,
      },
    });
    return NextResponse.json({ data: newOrder });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
