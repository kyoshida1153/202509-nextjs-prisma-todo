"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import Menu from "./Menu";

type NavigationProps = {
  currentUser: User | null;
};

// ナビゲーション
const Navigation: React.FC<NavigationProps> = ({ currentUser }) => {
  return (
    <header className="shadow-lg shadow-gray-100">
      <div className="flex items-center justify-between px-4 py-3 w-full">
        <Link href="/" className="cursor-pointer text-base font-normal">
          課題：Nextjs/Prismaを使ってフルスタックTodoアプリを作成しよう
        </Link>

        <div className="flex items-center justify-center space-x-2">
          <Menu currentUser={currentUser} />
        </div>
      </div>
    </header>
  );
};

export default Navigation;
