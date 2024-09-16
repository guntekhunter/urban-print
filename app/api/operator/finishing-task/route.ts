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
        // id_operator: reqBody.id,
        product_type: reqBody.type,
        status: reqBody.status,
      },
    });
    return NextResponse.json({
      data: res,
    });
  } catch (error) {
    console.log(error);
  }
}
