import TodoDetail from "@/components/todo/TodoDetail";
import Link from "next/link";

export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <div className="text-sm">
        <Link href="/">TOP</Link> &gt; TODOの詳細
      </div>

      <h1 className="text-2xl py-2 [border-bottom:2px_solid_#e2e8f0]">
        TODOの詳細
      </h1>

      <TodoDetail id={id} />
    </>
  );
}
