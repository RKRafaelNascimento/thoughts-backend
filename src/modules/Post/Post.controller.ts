import { IValidatorService } from "@/shared/validator/interfaces";
import { IPostController, IPostService } from "./interfaces";
import { Request, Response } from "express";
import { HttpHelpers } from "@/shared/httpHelper";
import { BadRequestError } from "@/shared/errors";
import { PostErrorCode } from "./error";
import { StatusCodes } from "http-status-codes";
import { PostSchema } from "./schemas";

export class PostController implements IPostController {
  constructor(
    private postService: IPostService,
    private validatorService: IValidatorService,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.userId);

      const { value, error } = this.validatorService.validate<{
        userId: number;
        content: string;
      }>(PostSchema.create, { userId, ...req.body });

      if (error) {
        throw new BadRequestError(
          "Missing or invalid params",
          PostErrorCode.MISSING_OR_INVALID_PARAMS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const post = await this.postService.create({
        userId,
        content: value.content,
      });

      res.status(StatusCodes.CREATED).json(post);
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }
}
