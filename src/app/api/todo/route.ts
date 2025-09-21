import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 一覧取得
export async function GET(request: Request) {
  try {
    await prisma.$connect();

    const result = await prisma.todo.findMany({
      include: {
        status: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(
      {
        message: "Success",
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// 投稿
export async function POST(request: Request) {
  try {
    const { title, memo, statusId } = await request.json();
    await prisma.$connect();
    const todo = await prisma.todo.create({
      data: { title, memo, statusId },
    });
    return NextResponse.json({ message: "Success", todo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
