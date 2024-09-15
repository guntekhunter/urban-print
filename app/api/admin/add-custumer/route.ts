import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const costumers = await prisma.custumer.findMany({});
  return NextResponse.json({ data: costumers });
}

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
    const costumers = await prisma.custumer.findMany({});
    return NextResponse.json({ data: costumers });
  } catch (error) {
    console.log(error);
  }
}
