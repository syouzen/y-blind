import { mutationOptions } from "@tanstack/react-query";

import api from "@/lib/api";
import {
  IKakaoSignInPayload,
  ISignInPayload,
  ISignUpPayload,
} from "@/types/api-payload";
import { ILoginResponse, IResultResponse } from "@/types/api-response";

// Raw functions (서버사이드에서 직접 호출용)
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

async function signInKakao(payload: IKakaoSignInPayload) {
  const { data: result } = await api.post<ILoginResponse>(
    "/auth/sign-in/kakao",
    payload
  );
  return result;
}

// Mutation Options (클라이언트에서 useMutation용)
const signUpMutationOptions = () =>
  mutationOptions({
    mutationFn: signUp,
  });

const signInMutationOptions = () =>
  mutationOptions({
    mutationFn: signIn,
  });

const signInKakaoMutationOptions = () =>
  mutationOptions({
    mutationFn: signInKakao,
  });

export const AuthApi = {
  // Raw functions
  signUp,
  signIn,
  signInKakao,
  // Mutation Options
  signUpMutationOptions,
  signInMutationOptions,
  signInKakaoMutationOptions,
};
