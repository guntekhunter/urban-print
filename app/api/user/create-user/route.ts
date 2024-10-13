import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

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
        email: reqBody.email,
      },
    });

    if (isUser?.id === undefined) {
      const encryptPassword = await bcrypt.hash(reqBody.password, 10);
      const newUser = await prisma.user.create({
        data: {
          email: reqBody.email,
          name: reqBody.name,
          type: reqBody.type,
          password: encryptPassword,
        },
      });
      // return NextResponse.json({ data: newUser });
    }

    const user = await prisma.user.findMany({
      where: {
        type: {
          not: "manager",
        },
      },
    });
    return NextResponse.json({ data: user });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
