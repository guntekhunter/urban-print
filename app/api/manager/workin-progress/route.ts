import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const countsPrinting = await Promise.all([
      prisma.order.count({
        where: {
          id_operator: parseInt(reqBody.id),
          status: 1,
          order_date: {
            startsWith: reqBody.mounth,
          },
        },
      }),
      prisma.order.count({
        where: {
          id_operator: parseInt(reqBody.id),
          product_type: "printing",
          order_date: {
            startsWith: reqBody.mounth,
          },
        },
      }),
      prisma.order.count({
        where: {
          id_operator: parseInt(reqBody.id),
          status: 3,
          order_date: {
            startsWith: reqBody.mounth,
          },
        },
      }),
      prisma.order.count({
        where: {
          id_operator: parseInt(reqBody.id),
          status: 4,
          order_date: {
            startsWith: reqBody.mounth,
          },
        },
      }),
    ]);

    // Create a simplified response object
    const responsePrinting = {
      notStarted: countsPrinting[0],
      waiting: countsPrinting[1],
      onProgress: countsPrinting[2],
      finish: countsPrinting[3],
    };

    return NextResponse.json({
      response: responsePrinting,
    });
  } catch (error) {
    console.log(error);
  }
}
