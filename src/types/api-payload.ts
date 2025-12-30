export interface ISignUpPayload {
  username: string;
  pw: string;
}

export interface ISignInPayload {
  username: string;
  pw: string;
}

export interface IKakaoSignInPayload {
  token: string;
}

export interface IPostListPayload {
  page: number;
  limit: number;
}

export interface ICreatePostPayload {
  title: string;
  content: string;
}

export interface ICommentListPayload {
  postId: number;
  page: number;
  limit: number;
}

export interface ICreateCommentPayload {
  postId: number;
  content: string;
}

export interface ILoginPayload {
  id: string;
  password: string;
}
