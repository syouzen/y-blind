export interface IUser {
  id: number;
  username: string;
}

export interface IResultResponse {
  result: boolean;
}

export interface IPost {
  id: number;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  content: string;
  likeCount: number;
  commentsCount: number;
  isLikedByMe: boolean;
}

export interface IPostListResponse {
  data: IPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IComment {
  id: number;
  user: IUser;
  createdAt: string;
  updatedAt: string;
  content: string;
  likeCount: number;
  isLikedByMe: boolean;
  parentCommentId: string | null;
  postId: number;
  replies: IComment[];
}

export interface ICommentListResponse {
  data: IComment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ILoginResponse {
  id: number;
  username: string;
  nickname: string | null;
  accessToken: string;
  refreshToken: string;
}
