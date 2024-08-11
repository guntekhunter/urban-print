import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    // Count the total number of orders for the given operator
    const totalOrders = await prisma.order.count({
      where: {
        id_operator: reqBody,
      },
    });

    // Count the orders for each status and condition
    const countsPerformance = await Promise.all([
      prisma.order.count({
        where: {
          id_operator: reqBody,
          status: 1,
        },
      }),
      prisma.order.count({
        where: {
          id_operator: reqBody,
          status: 3,
        },
      }),
      prisma.order.count({
        where: {
          id_operator: reqBody,
          status: 4,
        },
      }),
      prisma.order.count({
        where: {
          id_operator: reqBody,
          status: {
            not: 4, // Exclude already finished orders from being counted as late
          },
          required_date: {
            lt: new Date().toISOString(), // Compare with current date in ISO string format
          },
        },
      }),
    ]);

    // Calculate performance percentages
    const performance = {
      notStarted: totalOrders
        ? Math.round((countsPerformance[0] / totalOrders) * 100)
        : 0,
      onProgress: totalOrders
        ? Math.round((countsPerformance[1] / totalOrders) * 100)
        : 0,
      finish: totalOrders
        ? Math.round((countsPerformance[2] / totalOrders) * 100)
        : 0,
      late: totalOrders
        ? Math.round((countsPerformance[3] / totalOrders) * 100)
        : 0,
    };

    return NextResponse.json({
      performance,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
