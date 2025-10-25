import api from "@/lib/api";
import {
  ICommentListPayload,
  ICreateCommentPayload,
  ICreatePostPayload,
  IPostListPayload,
} from "@/types/api-payload";
import {
  ICommentListResponse,
  IPostListResponse,
  IResultResponse,
} from "@/types/api-response";

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

async function getCommentList(payload: ICommentListPayload) {
  const { data: result } = await api.get<ICommentListResponse>(
    `/post/${payload.postId}/comments`,
    {
      params: payload,
    }
  );
  return result;
}

async function createComment(payload: ICreateCommentPayload) {
  const { data: result } = await api.post<IResultResponse>(
    `/post/${payload.postId}/comment`,
    payload
  );
  return result;
}

export const PostApi = {
  createPost,
  getPostList,
  getCommentList,
  createComment,
};
