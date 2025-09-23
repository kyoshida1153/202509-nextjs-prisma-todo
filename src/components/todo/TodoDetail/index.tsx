"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Loading } from "@/components/loading";
import { TodoWithStatus } from "../types";

type Props = {
  id: string;
};

export default function TodoDetail({ id }: Props) {
  const [todo, setTodo] = useState<TodoWithStatus>();
  const [loading, setLoading] = useState<boolean>(true);
  const [displayMessage, setDisplayMessage] = useState<string>("");

  useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/${id}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`response.status: ${response.status}`);
        }

        const { message, result } = await response.json();
        // console.log(message, result);
        setTodo(result);

        if (!result) {
          setDisplayMessage(`選択したタスクは存在しません。`);
        }
      } catch (error) {
        setDisplayMessage(
          `エラーが発生しました。再度ページを更新しても解消されない場合はお問い合わせください。 ${error}`
        );
      }
      setLoading(false);
    };
    getTodo();
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`response.status: ${response.status}`);
      }

      const { message, result } = await response.json();
      // console.log(message, result);
      setTodo(undefined);
      setDisplayMessage(`削除しました。`);
    } catch (error) {
      setDisplayMessage(
        `エラーが発生しました。再度削除を行っても解消されない場合はお問い合わせください。 ${error}`
      );
    }
    setLoading(false);

    setTimeout(() => {
      redirect("/");
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : todo ? (
        <div className="w-full">
          <div className="flex flex-wrap mb-6">
            <div className="w-full" id={todo?.id}>
              <div className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
                タスク名
              </div>
              <div className="appearance-none block bg-white text-gray-700 py-3 px-4 leading-tight">
                {todo?.title}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full">
              <div className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
                メモ
              </div>
              <div className="appearance-none block bg-white text-gray-700 py-3 px-4 leading-tight">
                {todo?.memo}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full">
              <div className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
                ステータス
              </div>
              <div className="appearance-none block bg-white text-gray-700 py-3 px-4 leading-tight">
                {todo?.status?.label}
              </div>
            </div>
          </div>
          <div className="flex -mx-3 mb-6 gap-x-2 justify-center">
            <Link
              href={`/todo/${id}/edit`}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              編集
            </Link>

            <button
              className="bg-gray-100 hover:bg-gray-500 text-gray-700 hover:text-white border border-gray-200 py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-colors"
              onClick={handleDelete}
            >
              削除
            </button>
          </div>
        </div>
      ) : (
        <p>{displayMessage}</p>
      )}
    </>
  );
}
