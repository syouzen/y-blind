export interface IUserJoinPayload {
  id: string;
  password: string;
}

export interface IUserLoginPayload {
  id: string;
  password: string;
}

export interface IPostListPayload {
  page: number;
  limit: number;
}

export interface ICreatePostPayload {
  content: string;
}

export interface ICommentListPayload {
  postId: string;
  page: number;
  limit: number;
}

export interface ICreateCommentPayload {
  postId: string;
  content: string;
}

export interface ILoginPayload {
  id: string;
  password: string;
}
