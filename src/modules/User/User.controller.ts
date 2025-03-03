import { IValidatorService } from "@/shared/validator/interfaces";
import { IUserController, IUserService } from "./interfaces";
import { Request, Response } from "express";
import { HttpHelpers } from "@/shared/httpHelper";
import { UserSchema } from "./schemas";
import { BadRequestError } from "@/shared/errors";
import { UserErrorCode } from "./error";
import { StatusCodes } from "http-status-codes";

export class UserController implements IUserController {
  constructor(
    private userService: IUserService,
    private validatorService: IValidatorService,
  ) {}

  async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.userId);

      const { value, error } = this.validatorService.validate<{
        userId: number;
      }>(UserSchema.getUserProfile, { userId });

      if (error) {
        throw new BadRequestError(
          "Missing or invalid params",
          UserErrorCode.MISSING_OR_INVALID_PARAMS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const profile = await this.userService.getUserProfile(value.userId);

      res.status(StatusCodes.OK).json(profile);
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }
}
