export interface IUserJoinPayload {
  id: string;
  password: string;
}

export interface IUserLoginPayload {
  id: string;
  password: string;
}

export interface IPostListPayload {
  offset: number;
  limit: number;
}

export interface ICreatePostPayload {
  content: string;
}

export interface ICommentListPayload {
  postId: string;
  offset: number;
  limit: number;
}

export interface ICreateCommentPayload {
  postId: string;
  content: string;
}
