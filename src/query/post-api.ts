import api from "@/lib/api";
import {
  ICommentListPayload,
  ICreateCommentPayload,
  ICreatePostPayload,
  IPostListPayload,
} from "@/types/api-payload";
import {
  IComment,
  IPostListResponse,
  IResultResponse,
} from "@/types/api-response";

async function createPost(payload: ICreatePostPayload) {
  const { data: result } = await api.post<IResultResponse>("/posts", payload);
  return result;
}

async function getPostList(payload: IPostListPayload) {
  const { data: result } = await api.get<IPostListResponse>("/posts", {
    params: payload,
  });
  return result;
}

async function getCommentList(payload: ICommentListPayload) {
  const { data: result } = await api.get<IComment[]>(
    `/posts/${payload.postId}/comments`,
    {
      params: {
        page: payload.page,
        limit: payload.limit,
      },
    }
  );
  return result;
}

async function createComment(payload: ICreateCommentPayload) {
  const { data: result } = await api.post<IResultResponse>(
    `/posts/${payload.postId}/comments`,
    {
      content: payload.content,
    }
  );
  return result;
}

async function likePost(postId: number) {
  const { data: result } = await api.post<IResultResponse>(
    `/posts/${postId}/likes`
  );
  return result;
}

async function unlikePost(postId: number) {
  // toggle 방식으로 같은 api 사용
  const { data: result } = await api.post<IResultResponse>(
    `/posts/${postId}/likes`
  );
  return result;
}

async function likeComment(commentId: number) {
  const { data: result } = await api.post<IResultResponse>(
    `/comments/${commentId}/likes`
  );
  return result;
}

async function unlikeComment(commentId: number) {
  // toggle 방식으로 같은 api 사용
  const { data: result } = await api.post<IResultResponse>(
    `/comments/${commentId}/likes`
  );
  return result;
}

async function editComment(postId: number, commentId: number, content: string) {
  const { data: result } = await api.patch<IResultResponse>(
    `posts/${postId}/comments/${commentId}`,
    {
      content,
    }
  );
  return result;
}

async function deleteComment(postId: number, commentId: number) {
  const { data: result } = await api.delete<IResultResponse>(
    `posts/${postId}/comments/${commentId}`
  );
  return result;
}

export const PostApi = {
  createPost,
  getPostList,
  getCommentList,
  createComment,
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
  editComment,
  deleteComment,
};
