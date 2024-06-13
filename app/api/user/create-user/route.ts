import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const isUser = await prisma.user.findMany();
  return NextResponse.json({ data: isUser });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const isUser = await prisma.user.findFirst({
      where: {
        email: reqBody.userEmail,
      },
    });
    if (isUser?.id === undefined) {
      const newUser = await prisma.user.create({
        data: {
          email: reqBody.email,
          name: reqBody.name,
          type: reqBody.type,
        },
      });
      return NextResponse.json({ data: newUser });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
