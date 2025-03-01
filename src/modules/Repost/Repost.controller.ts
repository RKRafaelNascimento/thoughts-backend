import { IValidatorService } from "@/shared/validator/interfaces";
import { IRepostController, IRepostService } from "./interfaces";
import { Request, Response } from "express";
import { HttpHelpers } from "@/shared/httpHelper";
import { BadRequestError } from "@/shared/errors";
import { RepostErrorCode } from "./error";
import { StatusCodes } from "http-status-codes";
import { RepostSchema } from "./schemas";

export class RepostController implements IRepostController {
  constructor(
    private repostService: IRepostService,
    private validatorService: IValidatorService,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.userId);

      const { value, error } = this.validatorService.validate<{
        userId: number;
        content: string;
        originalPostId: number;
      }>(RepostSchema.create, {
        userId,
        ...req.body,
        originalPostId: Number(req.params.originalPostId),
      });

      if (error) {
        throw new BadRequestError(
          "Missing or invalid params",
          RepostErrorCode.MISSING_OR_INVALID_PARAMS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const repost = await this.repostService.create({
        userId,
        content: value.content,
        originalPostId: value.originalPostId,
      });

      res.status(StatusCodes.CREATED).json(repost);
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }
}
