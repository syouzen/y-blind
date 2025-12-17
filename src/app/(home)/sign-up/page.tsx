import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

import { getCookie } from "cookies-next/server";

import SignUpForm from "./_components/sign-up-form";

export default async function SignUp() {
  const token = await getCookie("access_token", { cookies });

  if (token) {
    redirect("/", RedirectType.replace);
  }

  return <SignUpForm />;
}
