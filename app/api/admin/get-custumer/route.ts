import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const isUser = await prisma.custumer.findMany();
  return NextResponse.json({ data: isUser });
}
