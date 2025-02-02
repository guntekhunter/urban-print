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

    // Process each operator and compute performance
    const operatorStats = await Promise.all(
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

        const countTotal = count - late;
        const performance = Math.round(
          count > 0 ? (countTotal / count) * 100 : 0
        );

        return { id, name, onProgress, finish, late, performance, count };
      })
    );

    return NextResponse.json({ status: "Ok", data: operatorStats });
  } catch (error) {
    console.error("Error fetching operators' performance:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
