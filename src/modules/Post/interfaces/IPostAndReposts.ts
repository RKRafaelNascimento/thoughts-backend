import { IUser } from "@/modules/User/interfaces";

export interface IRepost {
  id: number;
  userId: number;
  originalPostId: number;
  content?: string | null;
  sentiment?: "pos" | "neg" | "neutral" | null;
  user: IUser;
  createdAt: Date;
}

export interface IPost {
  id: number;
  userId: number;
  content: string;
  sentiment: "pos" | "neg" | "neutral";
  createdAt: string;
  user: IUser;
  Repost: IRepost[];
}

export type IPostAndReposts = IPost[];
