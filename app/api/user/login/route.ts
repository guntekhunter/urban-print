import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  const idUser = await reqBody.user;
  try {
    
  } catch (error) {
    console.log(error);
  }
}
