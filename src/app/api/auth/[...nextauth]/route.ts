import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

// NextAuth設定
export const authOptions: NextAuthOptions = {
  // Prismaを使うための設定
  adapter: PrismaAdapter(prisma),
  // 認証プロバイダーの設定
  providers: [
    // Google認証
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // メールアドレス認証
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // メールアドレスとパスワード
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // メールアドレスとパスワードがない場合はエラー
        if (!credentials?.email || !credentials?.password) {
          throw new Error("メールアドレスとパスワードが存在しません");
        }

        // ユーザーを取得
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // ユーザーが存在しない場合はエラー
        if (!user || !user?.hashedPassword) {
          throw new Error("ユーザーが存在しません");
        }

        // パスワードが一致しない場合はエラー
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("パスワードが一致しません");
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
