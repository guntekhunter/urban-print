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
        product_type: "printing stickers",
        status: reqBody,
      },
    });
    return NextResponse.json({
      data: res,
    });
  } catch (error) {
    console.log(error);
  }
}
