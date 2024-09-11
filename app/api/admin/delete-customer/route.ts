import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const id = reqBody.id;
  try {
    const res = await prisma.custumer.delete({
      where: {
        id: id,
      },
    });

    const orderData = await prisma.custumer.findMany({});
    return NextResponse.json({
      deletedData: res,
      response: orderData,
    });
  } catch (error) {
    console.log(error);
  }
}
