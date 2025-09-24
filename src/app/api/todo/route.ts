import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/actions/getCurrentUser";

// 一覧取得
export async function GET(request: NextRequest) {
  try {
    // 認証チェック
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id ?? "";
    if (!currentUser && !userId) throw new Error("401");

    await prisma.$connect();

    const params = request.nextUrl.searchParams;
    const statusId = Number(params.get("statusId"));
    const createdAt = Number(params.get("createdAt"));

    const where = {};
    Object.assign(where, { userId: userId });
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
    if (!result) throw new Error("404");

    return NextResponse.json({ message: "Success", result }, { status: 200 });
  } catch (error) {
    if (error instanceof Error === false) throw null;

    let message: string = "";
    let status: number = 0;
    switch (error.message) {
      case "401":
        message = "Unauthorized";
        status = 401;
        break;
      case "404":
        message = "Not Found";
        status = 404;
        break;
      default:
        message = "Error";
        status = 500;
        break;
    }
    return NextResponse.json({ message }, { status });
  } finally {
    await prisma.$disconnect();
  }
}

// 投稿
export async function POST(request: Request) {
  try {
    // 認証チェック
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id ?? "";
    if (!currentUser && !userId) throw new Error("401");

    const { title, memo, statusId } = await request.json();
    await prisma.$connect();
    const result = await prisma.todo.create({
      data: { title, memo, statusId, userId },
    });
    if (!result) throw new Error("404");

    return NextResponse.json({ message: "Success", result }, { status: 201 });
  } catch (error) {
    if (error instanceof Error === false) throw null;

    let message: string = "";
    let status: number = 0;
    switch (error.message) {
      case "401":
        message = "Unauthorized";
        status = 401;
        break;
      case "404":
        message = "Not Found";
        status = 404;
        break;
      default:
        message = "Error";
        status = 500;
        break;
    }
    return NextResponse.json({ message }, { status });
  } finally {
    await prisma.$disconnect();
  }
}
