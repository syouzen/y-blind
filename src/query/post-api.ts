import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import api from "@/lib/api";
import { ICreateCommentPayload, ICreatePostPayload } from "@/types/api-payload";
import {
  IComment,
  IPost,
  IPostListResponse,
  IResultResponse,
} from "@/types/api-response";

async function createPost(payload: ICreatePostPayload) {
  const { data: result } = await api.post<IResultResponse>("/posts", payload);
  return result;
}

const getPostQueryOptions = (postId: number) =>
  queryOptions({
    queryKey: ["posts", postId] as const,
    queryFn: async () => {
      const { data: result } = await api.get<IPost>(`/posts/${postId}`);
      return result;
    },
  });

export const getPostListInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data: result } = await api.get<IPostListResponse>("/posts", {
        params: {
          page: pageParam,
          limit: 50,
        },
      });
      return result;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return null;
    },
    initialPageParam: 1,
  });

export const getCommentListInfiniteQueryOptions = (postId: number) =>
  infiniteQueryOptions({
    queryKey: ["comments", postId],
    queryFn: async ({ pageParam = 1 }) => {
      const { data: result } = await api.get<IComment[]>(
        `/posts/${postId}/comments`,
        {
          params: {
            page: pageParam,
            limit: 50,
          },
        }
      );
      return result;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.length === 50 ? lastPage.length + 1 : null;
    },
    initialPageParam: 1,
  });

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

async function deletePost(postId: number) {
  const { data: result } = await api.delete<IResultResponse>(
    `/posts/${postId}`
  );
  return result;
}

async function editPost(postId: number, content: string) {
  const { data: result } = await api.patch<IResultResponse>(
    `/posts/${postId}`,
    {
      content,
    }
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
  getPostQueryOptions,
  getPostListInfiniteQueryOptions,
  getCommentListInfiniteQueryOptions,
  createComment,
  likePost,
  unlikePost,
  deletePost,
  editPost,
  likeComment,
  unlikeComment,
  editComment,
  deleteComment,
};
