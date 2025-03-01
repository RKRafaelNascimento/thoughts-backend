import { Request, Response } from "express";

export interface IPostController {
  create(req: Request, res: Response): Promise<void>;
}
