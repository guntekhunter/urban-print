import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const isUser = await prisma.user.findFirst({
      where: {
        email: reqBody.userEmail,
      },
    });
    let passwordInput = isUser?.password ?? "";

    const comparePassword = await bcrypt.compare(
      reqBody.password,
      passwordInput
    );
    if (comparePassword) {
      return NextResponse.json({ status: "ok", data: isUser });
    }
    return NextResponse.json({ status: "error", message: "wrong password" });
  } catch (error) {
    console.log(error);
  }
}
