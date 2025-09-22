import Link from "next/link";
import TodoEditForm from "@/components/todo/TodoEditForm";

export default async function TodoEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="flex flex-col gap-[2em] w-full max-w-[500px]">
      <div className="text-sm">
        <Link href="/">TOP</Link> &gt; TODOの編集
      </div>

      <h1 className="text-2xl py-2 [border-bottom:2px_solid_#e2e8f0]">
        TODOの編集
      </h1>

      <TodoEditForm id={id} />
    </main>
  );
}
