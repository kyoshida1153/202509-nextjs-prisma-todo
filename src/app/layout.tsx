import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import getCurrentUser from "@/actions/getCurrentUser";
import Navigation from "@/components/navigation/Navigation";
import AuthContext from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";
import SignupModal from "@/components/auth/modal/SignupModal";
import LoginModal from "@/components/auth/modal/LoginModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "課題：Nextjs/Prismaを使ってフルスタックTodoアプリを作成しよう",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthContext>
          <ToasterContext />

          <SignupModal />
          <LoginModal />

          <Navigation currentUser={currentUser} />
          <div className="antialiased flex items-center flex-col p-4 md:p-12">
            <main className="flex flex-col gap-4 w-full max-w-[500px]">
              {children}
            </main>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
