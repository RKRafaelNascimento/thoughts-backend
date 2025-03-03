import { IPostAndReposts, IPost } from ".";

export interface IPostRepository {
  create(post: Omit<IPost, "id" | "createdAt">): Promise<IPost>;
  getById(id: number): Promise<IPost | null>;
  getAllPostsWithReposts(
    skip: number,
    take: number,
  ): Promise<IPostAndReposts[]>;
  getPostsAndRepostsFromFollowing(
    userId: number,
    skip: number,
    take: number,
  ): Promise<IPostAndReposts[]>;
  getPostsAndRepostByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<IPostAndReposts[]>;
}
