import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/actions/getCurrentUser";

// 取得
export async function GET(request: Request) {
  try {
    // 認証チェック
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id ?? "";
    if (!currentUser && !userId) throw new Error("401");

    await prisma.$connect();

    const id = request.url.split("/todo/")[1];
    const result = await prisma.todo.findUnique({
      include: {
        status: true,
      },
      where: { id, userId },
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

// 編集
export async function PUT(request: Request) {
  try {
    // 認証チェック
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id ?? "";
    if (!currentUser && !userId) throw new Error("401");

    await prisma.$connect();
    const id = request.url.split("/todo/")[1];
    const { title, memo, updateAt, statusId } = await request.json();

    const result = await prisma.todo.update({
      data: { title, memo, updateAt, statusId },
      where: { id, userId },
    });
    if (!result) throw new Error("404");

    return NextResponse.json(
      { message: "Success", result: result },
      { status: 200 }
    );
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

// 削除
export async function DELETE(request: Request) {
  try {
    // 認証チェック
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id ?? "";
    if (!currentUser && !userId) throw new Error("401");

    await prisma.$connect();
    const id = request.url.split("/todo/")[1];

    const result = await prisma.todo.delete({
      where: { id, userId },
    });
    if (!result) throw new Error("404");

    return NextResponse.json(
      { message: "Success", result: result },
      { status: 200 }
    );
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
