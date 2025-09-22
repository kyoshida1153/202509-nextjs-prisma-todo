import { Prisma, Todo as todo, TodoStatus as todoStatus } from "@prisma/client";

export type Todo = todo;

export type TodoStatus = todoStatus;

export type TodoWithStatus = Prisma.TodoGetPayload<{
  include: { status: true };
}>;
