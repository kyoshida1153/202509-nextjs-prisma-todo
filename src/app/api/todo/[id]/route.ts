import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 取得
export async function GET(request: Request) {
  try {
    await prisma.$connect();
    const id = request.url.split("/todo/")[1];

    const result = await prisma.todo.findUnique({
      include: {
        status: true,
      },
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Success",
        result: result,
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

// 編集
export async function PUT(request: Request) {
  try {
    await prisma.$connect();
    const id = request.url.split("/todo/")[1];
    const { title, memo, updateAt, statusId } = await request.json();

    const result = await prisma.todo.update({
      data: { title, memo, updateAt, statusId },
      where: { id },
    });

    return NextResponse.json(
      { message: "Success", result: result },
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

// 削除
export async function DELETE(request: Request) {
  try {
    await prisma.$connect();
    const id = request.url.split("/todo/")[1];

    const result = await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Success", result: result },
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
