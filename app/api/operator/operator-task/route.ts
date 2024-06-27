import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const countsPrinting = await Promise.all([
      prisma.order.count({
        where: {
          id_operator: reqBody,
          product_type: "printing",
          status: 1,
        },
      }),
      prisma.order.count({
        where: {
          id_operator: reqBody,
          product_type: "printing",
          status: 2,
        },
      }),
      prisma.order.count({
        where: {
          id_operator: reqBody,
          product_type: "printing",
          status: 3,
        },
      }),
      prisma.order.count({
        where: {
          id_operator: reqBody,
          product_type: "printing",
          status: 4,
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
    const countsFinishing = await Promise.all([
      prisma.order.count({
        where: {
          id_operator: reqBody,
          product_type: "finishing",
          status: 1,
        },
      }),
      prisma.order.count({
        where: {
          id_operator: reqBody,
          product_type: "finishing",
          status: 2,
        },
      }),
      prisma.order.count({
        where: {
          id_operator: reqBody,
          product_type: "finishing",
          status: 3,
        },
      }),
      prisma.order.count({
        where: {
          id_operator: reqBody,
          product_type: "finishing",
          status: 4,
        },
      }),
    ]);

    // Create a simplified response object
    const responseFinishing = {
      notStarted: countsFinishing[0],
      waiting: countsFinishing[1],
      onProgress: countsFinishing[2],
      finish: countsFinishing[3],
    };
    return NextResponse.json({
      printing: responsePrinting,
      finishing: responseFinishing,
    });
  } catch (error) {
    console.log(error);
  }
}
