import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const isUser = await prisma.user.findMany({
    where: {
      type: "admin",
    },
    take: 32000,
  });
  return NextResponse.json({ data: isUser });
}
