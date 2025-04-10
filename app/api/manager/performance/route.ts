import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    // Count the total number of orders for the given operator
    const operators = await prisma.user.findMany({
      where: { type: "operator" },
      select: { id: true, name: true }, // Adjust fields as needed
    });

    if (!operators.length) {
      return NextResponse.json({ status: "No operators found", data: [] });
    }

    const rateLate = 0.6;
    const rateCount = 0.4;

    // Step 1: Compute S for each operator
    const rawStats = await Promise.all(
      operators.map(async (operator) => {
        const { id, name } = operator;

        const onProgress = await prisma.order.count({
          where: { id_operator: id, status: 3 },
        });

        const finish = await prisma.order.count({
          where: { id_operator: id, status: { not: 1 } },
        });

        const late = await prisma.order.count({
          where: { id_operator: id, late: true },
        });

        const count = await prisma.order.count({
          where: { id_operator: id, status: { not: 1 } },
        });

        const right = count - late;

        const performance =
          count > 0
            ? Math.pow(right, rateLate) * Math.pow(count, rateCount)
            : 0;

        return { id, name, onProgress, finish, late, count, right, performance };
      })
    );

    const totalPerformance = rawStats.reduce(
      (sum, item) => sum + item.performance,
      0
    );

    const onProgress = await prisma.order.count({
      where: { id_operator: parseInt(reqBody.id), status: 3 },
    });

    const finish = await prisma.order.count({
      where: { id_operator: parseInt(reqBody.id), status: { not: 1 } },
    });

    const late = await prisma.order.count({
      where: { id_operator: parseInt(reqBody.id), late: true },
    });

    const count = await prisma.order.count({
      where: { id_operator: parseInt(reqBody.id), status: { not: 1 } },
    });

    const countTotal = count - late;

    const s = count > 0
      ? Math.pow(countTotal, rateLate) * Math.pow(count, rateCount)
      : 0;

    const performancenya = (s / totalPerformance) * 100


    const totalOrders = await prisma.order.count({
      where: {
        id_operator: parseInt(reqBody.id),
        order_date: {
          startsWith: reqBody.mounth,
        },
      },
    });

    // Count the orders for each status and condition
    const countsPerformance = await Promise.all([
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
          late: false,
          order_date: {
            startsWith: reqBody.mounth,
          },
        },
      }),
      prisma.order.count({
        where: {
          id_operator: parseInt(reqBody.id),
          late: true,
          order_date: {
            startsWith: reqBody.mounth,
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
      score: performancenya,
      count: totalOrders,
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
