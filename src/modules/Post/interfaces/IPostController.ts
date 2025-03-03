import { Request, Response } from "express";

export interface IPostController {
  create(req: Request, res: Response): Promise<void>;
  getFeed(req: Request, res: Response): Promise<void>;
  getPostsByUserId(req: Request, res: Response): Promise<void>;
}
