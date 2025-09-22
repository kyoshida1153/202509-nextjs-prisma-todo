"use client";
import React, { useEffect, useState } from "react";
import { useTodosStore } from "../stores";
import { useDebounce } from "./hooks";

type OrderParams = {
  createdAt?: string;
  statusId?: string;
};

export default function TodoListOrderForm() {
  const { setTodos } = useTodosStore();
  const [params, setParams] = useState<OrderParams>({});
  const debouncedParams = useDebounce(params, 300);

  const handleOrderForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const createdAt =
      (formData.get("createdAt") as string) === "on" ? "1" : "0";
    const statusId = (formData.get("statusId") as string) || "0";

    const newParams: OrderParams = {
      createdAt,
      statusId,
    };

    setParams(newParams);
  };

  useEffect(() => {
    if (Object.keys(debouncedParams).length === 0) return; // 初期は無視

    console.log("DB 通信発火:", debouncedParams);

    const getTodos = async (params: OrderParams) => {
      try {
        const queryString = new URLSearchParams(params).toString();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo?${queryString}`,
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
      } catch (error) {
        console.error(error);
      }
    };

    getTodos(debouncedParams);
  }, [debouncedParams]);

  return (
    <>
      <form id="TodoListOrderForm" onInput={handleOrderForm}>
        <div className="flex items-center gap-4">
          <div className="w-2/3">
            <div className="relative">
              <select
                name="statusId"
                defaultValue="0"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
              >
                <option className="dark:bg-dark-2" value="0">
                  すべて
                </option>
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
          <div className="w-1/3 flex flex-row-reverse">
            <div className="flex items-center w-[fit-content]">
              <label
                htmlFor="orderCreatedAt"
                className="cursor-pointer text-gray-700"
              >
                作成日
              </label>
              <input
                type="checkbox"
                name="createdAt"
                id="orderCreatedAt"
                defaultChecked={false}
                className="peer hidden"
              />
              <label
                htmlFor="orderCreatedAt"
                className="rotate-180 peer-checked:rotate-0 block w-4 h-4 cursor-pointer text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="fill-current"
                >
                  {
                    "<!--!Font Awesome Free 7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->"
                  }
                  <path d="M342.6 81.4C330.1 68.9 309.8 68.9 297.3 81.4L137.3 241.4C124.8 253.9 124.8 274.2 137.3 286.7C149.8 299.2 170.1 299.2 182.6 286.7L288 181.3L288 552C288 569.7 302.3 584 320 584C337.7 584 352 569.7 352 552L352 181.3L457.4 286.7C469.9 299.2 490.2 299.2 502.7 286.7C515.2 274.2 515.2 253.9 502.7 241.4L342.7 81.4z" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
