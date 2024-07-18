import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  try {
    const newOrder = await prisma.custumer.create({
      data: {
        address: reqBody.address,
        name: reqBody.name,
        contact_person: reqBody.contact,
      },
    });
    return NextResponse.json({ data: newOrder });
  } catch (error) {
    console.log(error);
  }
}
