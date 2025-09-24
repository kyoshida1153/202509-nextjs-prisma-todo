import Link from "next/link";
import TodoList from "@/components/todo/TodoList";
import TodoListOrderForm from "@/components/todo/TodoListOrderForm";

export default async function Home() {
  return (
    <>
      <h1 className="text-2xl py-2 [border-bottom:2px_solid_#e2e8f0]">TODO</h1>
      <div className="flex justify-center">
        <Link
          href="/todo/create"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full cursor-pointer transition-colors"
        >
          TODOを作成
        </Link>
      </div>
      <div className="p-4 md:p-6 bg-[#f7f7f7] rounded-1 flex gap-4 flex-col flex-nowrap items-center">
        <div className="w-full">
          <TodoListOrderForm />
        </div>
        <TodoList />
      </div>
    </>
  );
}
