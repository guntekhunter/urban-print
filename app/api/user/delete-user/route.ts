import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  // const idUser = await reqBody.user;
  try {
    await prisma.user.delete({
      where: {
        id: reqBody,
      },
    });
    const users = await prisma.user.findMany({
      where: {
        type: {
          not: "manager",
        },
      },
    });
    return NextResponse.json({ data: users });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
