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
  result: boolean;
  data: IPost[];
}

export interface IComment {
  id: string;
  userName: string;
  createdAt: string;
  content: string;
}

export interface ICommentListResponse {
  result: boolean;
  data: IComment[];
}
