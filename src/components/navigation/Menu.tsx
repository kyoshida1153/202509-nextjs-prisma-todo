"use client";

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

import useLoginModal from "../auth/modal/hooks/useLoginModal";
import useSignupModal from "../auth/modal/hooks/useSignupModal";
import MenuItem from "./MenuItem";
import Image from "next/image";

type MenuProps = {
  currentUser: User | null;
};

// メニュー
const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();

  // メニューオープン
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="relative h-8 w-8 cursor-pointer" onClick={toggleOpen}>
        <Image
          src={currentUser?.image || "/default.png"}
          className="rounded-full object-cover"
          alt="avatar"
          fill
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-40 overflow-hidden rounded-lg bg-white text-sm shadow-lg shadow-gray-100">
          <div className="cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="ログアウト"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="ログイン"
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  label="サインアップ"
                  onClick={() => {
                    signupModal.onOpen();
                    setIsOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
