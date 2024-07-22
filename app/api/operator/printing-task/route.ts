import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const res = await prisma.order.findMany({
      include: {
        Status: true,
      },
      where: {
        product_type:
          "printing stickers" || "printing potography" || "printing poster",
      },
    });
    return NextResponse.json({
      data: res,
    });
  } catch (error) {
    console.log(error);
  }
}
