import { Request, Response } from "express";

export interface IRepostController {
  create(req: Request, res: Response): Promise<void>;
}
