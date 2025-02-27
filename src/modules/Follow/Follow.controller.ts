import { IValidatorService } from "@/shared/validator/interfaces";
import { IFollowController, IFollowService } from "./interfaces";
import { Request, Response } from "express";
import { HttpHelpers } from "@/shared/httpHelper";
import { FollowSchema } from "./schemas";
import { BadRequestError } from "@/shared/errors";
import { FollowErrorCode } from "./error";
import { StatusCodes } from "http-status-codes";

export class FollowControler implements IFollowController {
  constructor(
    private followService: IFollowService,
    private validatorService: IValidatorService,
  ) {}

  async follow(req: Request, res: Response): Promise<void> {
    try {
      const { value, error } = this.validatorService.validate<{
        followerId: number;
        followedId: number;
      }>(FollowSchema.follow, req.body);

      if (error) {
        throw new BadRequestError(
          "Missing or invalid params",
          FollowErrorCode.MISSING_OR_INVALID_PARAMS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const { followerId, followedId } = value;

      const follow = await this.followService.follow(followerId, followedId);
      res.status(StatusCodes.CREATED).json(follow);
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }
}
