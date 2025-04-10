import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Fetch all users with type "operator"
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
            ? Math.pow(right || 1, rateLate) * Math.pow(count, rateCount)
            : 0;

        return { id, name, onProgress, finish, late, count, right, performance };
      })
    );

    const totalPerformance = rawStats.reduce(
      (sum, item) => sum + item.performance,
      0
    );

    const operatorStats = rawStats
      .map((item) => ({
        ...item,
        performance:
          totalPerformance > 0
            ? (item.performance / totalPerformance) * 100
            : 0,
      }))
      .sort((a, b) => b.performance - a.performance); // Sort by highest

    return NextResponse.json({ status: "Ok", data: operatorStats });
  } catch (error) {
    console.error("Error fetching operators' performance:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
