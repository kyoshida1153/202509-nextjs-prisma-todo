"use client";
import { useState, useRef } from "react";
import { redirect } from "next/navigation";
import { Loading } from "@/components/loading";

export default function TodoCreatForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [displayMessage, setDisplayMessage] = useState<string>("");

  const titleRef = useRef<HTMLInputElement | null>(null);
  const memoRef = useRef<HTMLTextAreaElement | null>(null);
  const statusIdRef = useRef<HTMLSelectElement | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const requestBody = {
        title: titleRef.current?.value,
        memo: memoRef.current?.value,
        statusId: Number(statusIdRef.current?.value),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/`,
        {
          method: "POST",
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
      // console.log(message, result);
      setDisplayMessage(`作成しました。`);
    } catch (error) {
      console.log("error", error);
      setDisplayMessage(
        `エラーが発生しました。再度作成を行っても解消されない場合はお問い合わせください。 ${error}`
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
      ) : !displayMessage ? (
        <form className="w-full" onSubmit={handleCreate}>
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                defaultValue=""
                ref={titleRef}
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
                defaultValue=""
                ref={memoRef}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-24"
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
                  defaultValue="1"
                  ref={statusIdRef}
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
              value="作成"
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
