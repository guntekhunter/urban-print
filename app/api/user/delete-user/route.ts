import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const idUser = await reqBody.user;
  try {
    const isUser = await prisma.user.findFirst({
      where: {
        email: reqBody.userEmail,
      },
    });
    if (isUser?.id === undefined) {
      const newUser = await prisma.user.delete({
        where: {
          id: idUser,
        },
      });
      return NextResponse.json({ data: newUser });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
