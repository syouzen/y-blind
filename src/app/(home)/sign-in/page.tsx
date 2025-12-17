import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { getCookie } from "cookies-next/server";

import SignInForm from "./_components/sign-in-form";

export default async function SignIn() {
  const token = await getCookie("access_token", { cookies });

  if (token) {
    redirect("/", RedirectType.replace);
  }

  return <SignInForm />;
}
