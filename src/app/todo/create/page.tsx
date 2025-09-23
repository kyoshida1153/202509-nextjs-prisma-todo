import TodoCreatForm from "@/components/todo/TodoCreatForm";
import Link from "next/link";

export default function TodoAddPage() {
  return (
    <>
      <div className="text-sm">
        <Link href="/">TOP</Link> &gt; TODOの作成
      </div>

      <h1 className="text-2xl py-2 [border-bottom:2px_solid_#e2e8f0]">
        TODOの作成
      </h1>

      <TodoCreatForm />
    </>
  );
}
