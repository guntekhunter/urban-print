import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const id = reqBody.id;
  const status = reqBody.status;
  try {
    const res = await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status,
      },
    });
    return NextResponse.json({
      response: res,
    });
  } catch (error) {
    console.log(error);
  }
}
