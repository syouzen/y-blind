"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface NextAuthProviderProps {
  children: ReactNode;
}

export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
