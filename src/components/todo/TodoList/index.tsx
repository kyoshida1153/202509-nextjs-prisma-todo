"use client";
import { useEffect, useState } from "react";
import { useTodosStore } from "../stores";
import Link from "next/link";
import { Loading } from "@/components/loading";
import { formatDate } from "@/utils";

export default function TodoList() {
  const { todos, setTodos } = useTodosStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [displayMessage, setDisplayMessage] = useState<string>("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo`,
          {
            method: "GET",
            // cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`response.status: ${response.status}`);
        }

        const { message, result } = await response.json();
        // console.log(message, result);
        setTodos(result);

        if (!result) {
          setDisplayMessage(`タスクはありません。`);
        }
      } catch (error) {
        setDisplayMessage(
          `エラーが発生しました。再度ページを更新しても解消されない場合はお問い合わせください。 ${error}`
        );
      }
      setLoading(false);
    };
    getTodos();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : todos && todos.length > 0 ? (
        <ul className="w-full flex flex-col gap-y-2">
          {todos?.map((todo) => (
            <Link
              href={`/todo/${todo.id}`}
              key={todo.id}
              className="flex flex-wrap items-center flex-row gap-y-1 px-4 py-2 border-solid border border-[#ccc] rounded-md bg-[#fff] no-underline hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <div className="w-full text-lg">{todo.title}</div>
              <div
                data-status={todo.statusId}
                className="w-[6em] text-xs text-center text-gray-700 rounded-full px-[6px] py-[2px] data-[status=1]:bg-[#D4E4ED] data-[status=2]:bg-[#FFF8B8] data-[status=3]:bg-[#FAAFA8]"
              >
                {todo.status.label}
              </div>
              <div className="ml-auto text-sm text-gray-500">
                {formatDate(todo.createdAt)}
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <p>{displayMessage}</p>
      )}
    </>
  );
}
