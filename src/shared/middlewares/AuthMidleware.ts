import { Request, Response, NextFunction } from "express";
import { IUserService } from "@/modules/User/interfaces";
import { UserServiceFactory } from "@/modules/User";
import { UnauthorizedError, BadRequestError } from "@/shared/errors";
import { HttpHelpers } from "@/shared/httpHelper";
import { MiddlewareErrorCode } from "./error";

export class AuthMiddleware {
  private static userService: IUserService = UserServiceFactory.getInstance();

  public static async authorizeUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = Number(req.headers["user_id"]);

      if (!userId) {
        throw new BadRequestError(
          "User ID is missing or invalid",
          MiddlewareErrorCode.MISSING_OR_INVALID_PARAMS,
        );
      }

      const userExists = await AuthMiddleware.userService.getById(userId);

      if (!userExists) {
        throw new UnauthorizedError(
          "Unauthorized access",
          MiddlewareErrorCode.USER_NOT_AUTHORIZED,
        );
      }

      req.userId = userId;

      next();
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }
}
