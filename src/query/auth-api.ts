import api from "@/lib/api";
import { ISignInPayload, ISignUpPayload } from "@/types/api-payload";
import { ILoginResponse, IResultResponse } from "@/types/api-response";

async function signUp(payload: ISignUpPayload) {
  const { data: result } = await api.post<IResultResponse>(
    "/auth/sign-up",
    payload
  );
  return result;
}

async function signIn(payload: ISignInPayload) {
  const { data: result } = await api.post<ILoginResponse>(
    "/auth/sign-in",
    payload
  );
  return result;
}

export const AuthApi = {
  signUp,
  signIn,
};
