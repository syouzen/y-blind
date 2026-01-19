import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
} from "@tanstack/react-query";

import api from "@/lib/api";
import { ICreateCommentPayload, ICreatePostPayload } from "@/types/api-payload";
import {
  IComment,
  IPost,
  IPostListResponse,
  IResultResponse,
} from "@/types/api-response";

const createPostMutationOptions = () =>
  mutationOptions({
    mutationFn: async (payload: ICreatePostPayload) => {
      const { data: result } = await api.post<IResultResponse>(
        "/posts",
        payload
      );
      return result;
    },
  });

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

const createCommentMutationOptions = () =>
  mutationOptions({
    mutationFn: async (payload: ICreateCommentPayload) => {
      const { data: result } = await api.post<IResultResponse>(
        `/posts/${payload.postId}/comments`,
        {
          content: payload.content,
        }
      );
      return result;
    },
  });

const likePostMutationOptions = () =>
  mutationOptions({
    mutationFn: async (postId: number) => {
      const { data: result } = await api.post<IResultResponse>(
        `/posts/${postId}/likes`
      );
      return result;
    },
  });

const unlikePostMutationOptions = () =>
  mutationOptions({
    // toggle 방식으로 같은 api 사용
    mutationFn: async (postId: number) => {
      const { data: result } = await api.post<IResultResponse>(
        `/posts/${postId}/likes`
      );
      return result;
    },
  });

const deletePostMutationOptions = () =>
  mutationOptions({
    mutationFn: async (postId: number) => {
      const { data: result } = await api.delete<IResultResponse>(
        `/posts/${postId}`
      );
      return result;
    },
  });

const editPostMutationOptions = () =>
  mutationOptions({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: number;
      content: string;
    }) => {
      const { data: result } = await api.patch<IResultResponse>(
        `/posts/${postId}`,
        {
          content,
        }
      );
      return result;
    },
  });

const likeCommentMutationOptions = () =>
  mutationOptions({
    mutationFn: async (commentId: number) => {
      const { data: result } = await api.post<IResultResponse>(
        `/comments/${commentId}/likes`
      );
      return result;
    },
  });

const unlikeCommentMutationOptions = () =>
  mutationOptions({
    // toggle 방식으로 같은 api 사용
    mutationFn: async (commentId: number) => {
      const { data: result } = await api.post<IResultResponse>(
        `/comments/${commentId}/likes`
      );
      return result;
    },
  });

const editCommentMutationOptions = () =>
  mutationOptions({
    mutationFn: async ({
      postId,
      commentId,
      content,
    }: {
      postId: number;
      commentId: number;
      content: string;
    }) => {
      const { data: result } = await api.patch<IResultResponse>(
        `posts/${postId}/comments/${commentId}`,
        {
          content,
        }
      );
      return result;
    },
  });

const deleteCommentMutationOptions = () =>
  mutationOptions({
    mutationFn: async ({
      postId,
      commentId,
    }: {
      postId: number;
      commentId: number;
    }) => {
      const { data: result } = await api.delete<IResultResponse>(
        `posts/${postId}/comments/${commentId}`
      );
      return result;
    },
  });

export const PostApi = {
  createPostMutationOptions,
  getPostQueryOptions,
  getPostListInfiniteQueryOptions,
  getCommentListInfiniteQueryOptions,
  createCommentMutationOptions,
  likePostMutationOptions,
  unlikePostMutationOptions,
  deletePostMutationOptions,
  editPostMutationOptions,
  likeCommentMutationOptions,
  unlikeCommentMutationOptions,
  editCommentMutationOptions,
  deleteCommentMutationOptions,
};
