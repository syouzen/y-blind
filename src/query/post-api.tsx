import api from "@/lib/api";
import { ICreatePostPayload, IPostListPayload } from "@/types/api-payload";
import { IPostListResponse, IResultResponse } from "@/types/api-response";

async function createPost(payload: ICreatePostPayload) {
  const { data: result } = await api.post<IResultResponse>("/post", payload);
  return result;
}

async function getPostList(payload: IPostListPayload) {
  const { data: result } = await api.get<IPostListResponse>("/posts", {
    params: payload,
  });
  return result;
}

export const PostApi = {
  createPost,
  getPostList,
};
