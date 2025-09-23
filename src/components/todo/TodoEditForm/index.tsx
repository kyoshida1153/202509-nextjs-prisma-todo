"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Loading } from "@/components/loading";
import { TodoWithStatus } from "../types";

type Props = {
  id: string;
};

export default function TodoEditForm({ id }: Props) {
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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const requestBody = {
        title: formData.get("title") as string,
        memo: formData.get("memo") as string,
        updateAt: new Date().toISOString(),
        statusId: Number(formData.get("statusId")),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`response.status: ${response.status}`);
      }

      const { message, result } = await response.json();
      console.log(message, result);
      setTodo(undefined);
      setDisplayMessage(`編集しました。`);
    } catch (error) {
      console.log("error", error);
      setDisplayMessage(
        `エラーが発生しました。再度編集を行っても解消されない場合はお問い合わせください。 ${error}`
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
        <form className="w-full" onSubmit={handleUpdate}>
          <input type="hidden" name="id" value={todo.id} />
          <div className="flex flex-wrap mb-6">
            <div className="w-full">
              <label
                htmlFor="title"
                className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
              >
                タスク名
              </label>
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={todo?.title}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full">
              <label
                htmlFor="memo"
                className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
              >
                メモ
              </label>
              <textarea
                name="memo"
                id="memo"
                defaultValue={todo?.memo ?? ""}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-wrap mb-6">
            <div className="w-full">
              <label
                htmlFor="statusId"
                className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
              >
                ステータス
              </label>
              <div className="relative">
                <select
                  name="statusId"
                  defaultValue={todo?.statusId}
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option className="dark:bg-dark-2" value="1">
                    優先度小
                  </option>
                  <option className="dark:bg-dark-2" value="2">
                    優先度中
                  </option>
                  <option className="dark:bg-dark-2" value="3">
                    優先度大
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mb-6 gap-x-2 justify-center">
            <input
              type="submit"
              value="保存"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-colors"
            />
          </div>
        </form>
      ) : (
        <p>{displayMessage}</p>
      )}
    </>
  );
}
