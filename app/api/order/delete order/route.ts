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
    return NextResponse.json({
      response: res,
    });
  } catch (error) {
    console.log(error);
  }
}
