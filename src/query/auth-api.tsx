import api from "@/lib/api";
import { IUserJoinPayload, IUserLoginPayload } from "@/types/api-payload";
import { IResultResponse } from "@/types/api-response";

async function join(payload: IUserJoinPayload) {
  const { data: result } = await api.post<IResultResponse>(
    "/user/join/",
    payload
  );
  return result;
}

async function login(payload: IUserLoginPayload) {
  const { data: result } = await api.post<IResultResponse>(
    "/user/login/",
    payload
  );
  return result;
}

export const AuthApi = {
  join,
  login,
};
