import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const orders = await prisma.order.findMany({
    include: {
      Status: true,
    },
    take: 32000,
  });
  const finish = await prisma.order.findMany({
    where: {
      status: 4,
    },
    take: 32000,
  });
  const length = finish.length;
  return NextResponse.json({ data: orders, finish: length });
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
        product_width: reqBody.product_width,
        product_length: reqBody.product_length,
        cutting_width: reqBody.cutting_width,
        cutting_length: reqBody.cutting_length,
        material: reqBody.material,
        color: reqBody.color,
        coating: reqBody.coating,
        prize: reqBody.prize,
        late: reqBody.late,
        type: reqBody.type,
        quantity: reqBody.quantity,
      },
    });
    return NextResponse.json({ data: newOrder });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
