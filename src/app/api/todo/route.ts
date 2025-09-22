import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 一覧取得
export async function GET(request: NextRequest) {
  try {
    await prisma.$connect();

    const params = request.nextUrl.searchParams;
    const statusId = Number(params.get("statusId"));
    const createdAt = Number(params.get("createdAt"));

    const where = {};
    if (statusId > 0) {
      Object.assign(where, { statusId: statusId });
    }

    const orderBy = {};
    Object.assign(orderBy, {
      createdAt: Number(createdAt === 1) ? "asc" : "desc",
    });

    const result = await prisma.todo.findMany({
      include: {
        status: true,
      },
      where,
      orderBy,
    });

    return NextResponse.json(
      {
        message: "Success",
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", result: error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// 投稿
export async function POST(request: Request) {
  try {
    const { title, memo, statusId } = await request.json();
    await prisma.$connect();
    const result = await prisma.todo.create({
      data: { title, memo, statusId },
    });
    return NextResponse.json(
      { message: "Success", result: result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error", result: error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
