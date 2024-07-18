import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const id = await req.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ data: user });
  } catch (error) {
    console.log(error);
  }
}
