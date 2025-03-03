interface IUserCount {
  followers: number;
  following: number;
  Post: number;
  Repost: number;
}

export interface IUserWithCount {
  id: number;
  username: string;
  createdAt: Date;
  _count: IUserCount;
}

export interface IUserProfile {
  id: number;
  username: string;
  joinedAt: string;
  followersCount: number;
  followingCount: number;
  totalPosts: number;
}
