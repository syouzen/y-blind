export interface IResultResponse {
  result: boolean;
}

export interface IPost {
  id: string;
  userName: string;
  createdAt: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

export interface IPostListResponse {
  data: IPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IComment {
  id: string;
  userName: string;
  createdAt: string;
  content: string;
}

export interface ICommentListResponse {
  data: IComment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ILoginResponse {
  refreshToken: string;
  accessToken: string;
}
