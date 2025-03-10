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
      const followedId = Number(req.params.followedId);
      const followerId = Number(req.userId);

      const { value, error } = this.validatorService.validate<{
        followerId: number;
        followedId: number;
      }>(FollowSchema.follow, { followedId, followerId });

      if (error) {
        throw new BadRequestError(
          "Missing or invalid params",
          FollowErrorCode.MISSING_OR_INVALID_PARAMS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const follow = await this.followService.follow(
        value.followerId,
        value.followedId,
      );

      res.status(StatusCodes.CREATED).json(follow);
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }

  async unfollow(req: Request, res: Response): Promise<void> {
    try {
      const followedId = Number(req.params.followedId);
      const followerId = Number(req.userId);

      const { value, error } = this.validatorService.validate<{
        followerId: number;
        followedId: number;
      }>(FollowSchema.unfollow, { followedId, followerId });

      if (error) {
        throw new BadRequestError(
          "Missing or invalid params",
          FollowErrorCode.MISSING_OR_INVALID_PARAMS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      await this.followService.unfollow(value.followerId, value.followedId);

      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }
}
