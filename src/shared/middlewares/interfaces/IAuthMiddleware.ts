import { Request, Response, NextFunction } from "express";

export interface IAuthMiddleware {
  authorizeUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
