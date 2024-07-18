import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const isUser = await prisma.custumer.findUnique({
    where: {
      id: reqBody,
    },
  });
  return NextResponse.json({ data: isUser });
}
