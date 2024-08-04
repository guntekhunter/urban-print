import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const countsPrintingStickers = await Promise.all([
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "finishing stickers",
          status: 2,
        },
      }),
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "printing stickers",
          status: {
            in: [1, 3],
          },
        },
      }),
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "finishing stickers",
          status: 3,
        },
      }),
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "finishing stickers",
          status: 4,
        },
      }),
    ]);

    const countsPrintingPhotography = await Promise.all([
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "finishing photography",
          status: 2,
        },
      }),
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "printing potography",
          status: {
            in: [1, 3],
          },
        },
      }),
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "finishing photography",
          status: 3,
        },
      }),
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "finishing photography",
          status: 4,
        },
      }),
    ]);

    const countsPrintingPoster = await Promise.all([
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "finishing poster",
          status: 2,
        },
      }),
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "printing poster",
          status: {
            in: [1, 3],
          },
        },
      }),
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "finishing poster",
          status: 3,
        },
      }),
      prisma.order.count({
        where: {
          // id_operator: reqBody,
          product_type: "finishing poster",
          status: 4,
        },
      }),
    ]);

    // Create simplified response objects
    const responsePrintingStickers = {
      notStarted: countsPrintingStickers[0],
      waiting: countsPrintingStickers[1],
      onProgress: countsPrintingStickers[2],
      finish: countsPrintingStickers[3],
    };

    const responsePrintingPhotography = {
      notStarted: countsPrintingPhotography[0],
      waiting: countsPrintingPhotography[1],
      onProgress: countsPrintingPhotography[2],
      finish: countsPrintingPhotography[3],
    };

    const responsePrintingPoster = {
      notStarted: countsPrintingPoster[0],
      waiting: countsPrintingPoster[1],
      onProgress: countsPrintingPoster[2],
      finish: countsPrintingPoster[3],
    };

    return NextResponse.json({
      finishingStickers: responsePrintingStickers,
      finishingPoster: responsePrintingPoster,
      finishingPhotography: responsePrintingPhotography,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const res = await prisma.order.findMany({
      include: {
        Status: true,
      },
      where: {
        id: reqBody,
      },
    });
    return NextResponse.json({
      data: res,
    });
  } catch (error) {
    console.log(error);
  }
}
