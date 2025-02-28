import { Request, Response } from "express";

export interface IFollowController {
  follow(req: Request, res: Response): Promise<void>;
  unfollow(req: Request, res: Response): Promise<void>;
}
