import { cookies } from "next/headers";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Kakao from "next-auth/providers/kakao";

import { setCookie } from "cookies-next/server";
import { object, string } from "zod";

import { AuthApi } from "./query/auth-api";

const signInSchema = object({
  username: string()
    .min(1, {
      message: "아이디를 입력해주세요.",
    })
    .max(12, {
      message: "아이디는 12자 이내로 입력해주세요.",
    })
    .regex(/^[a-z0-9_-]+$/, {
      message: "아이디는 영문 소문자, 숫자, _, -만 사용할 수 있습니다.",
    }),
  pw: string()
    .min(8, {
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
      message:
        "비밀번호는 대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    }),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: "ID", type: "id" },
        pw: { label: "비밀번호", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { username, pw } = await signInSchema.parseAsync(credentials);

          const loginData = await AuthApi.signIn({
            username,
            pw,
          });

          await setCookie("access_token", loginData.accessToken, { cookies });
          await setCookie("refresh_token", loginData.refreshToken, { cookies });

          return {
            id: loginData.id.toString(),
            name: loginData.username,
          };
        } catch (error) {
          console.log("authorize error", error);
          return null;
        }
      },
    }),
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID || "",
      clientSecret: process.env.AUTH_KAKAO_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    async signIn({ account, user }) {
      try {
        if (account?.provider === "kakao") {
          const loginData = await AuthApi.signInKakao({
            token: account.access_token || "",
          });

          await setCookie("access_token", loginData.accessToken, { cookies });
          await setCookie("refresh_token", loginData.refreshToken, { cookies });

          // user 정보 업데이트
          if (user) {
            user.id = loginData.id.toString();
            user.name = loginData.username;
          }
        }

        return true;
      } catch (error) {
        console.log("signIn callback error", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return baseUrl + "/";
      }
      if (url.startsWith("/")) {
        return baseUrl + url;
      }
      return baseUrl + "/";
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
