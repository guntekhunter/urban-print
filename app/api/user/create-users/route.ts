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

  if (!Array.isArray(reqBody)) {
    return NextResponse.json(
      { error: "Request body must be an array of users." },
      { status: 400 }
    );
  }

  try {
    // Iterate over the array and upsert each user
    const upsertedUsers = await Promise.all(
      reqBody.map(async (user) => {
        const encryptPassword = await bcrypt.hash(user.password, 10);
        return await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            type: user.type,
            password: encryptPassword,
          },
          create: {
            email: user.email,
            name: user.name,
            type: user.type,
            password: encryptPassword,
          },
        });
      })
    );

    return NextResponse.json({ data: upsertedUsers });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
