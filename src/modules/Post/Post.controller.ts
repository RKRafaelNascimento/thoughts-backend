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

  async getFeed(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.userId);

      const { page = 1, pageSize = 10, filter = "all" } = req.query;
      const currentPage = Number(page) < 1 ? 1 : Number(page);
      const skip = (currentPage - 1) * Number(pageSize);
      const take = Number(pageSize);
      const isFollowing = filter === "following";

      const { value, error } = this.validatorService.validate<{
        page: number;
        pageSize: number;
      }>(PostSchema.getFeed, { page: skip, pageSize: take });

      if (error) {
        throw new BadRequestError(
          "Missing or invalid params",
          PostErrorCode.MISSING_OR_INVALID_PARAMS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const feed = await this.postService.getFeed(
        value.page,
        value.pageSize,
        userId,
        isFollowing,
      );

      res.status(StatusCodes.OK).json(feed);
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }

  async getPostsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.userId);

      const { page = 1, pageSize = 5 } = req.query;
      const currentPage = Number(page) < 1 ? 1 : Number(page);
      const skip = (currentPage - 1) * Number(pageSize);
      const take = Number(pageSize);

      const { value, error } = this.validatorService.validate<{
        page: number;
        pageSize: number;
        userId: number;
      }>(PostSchema.getPostByUseId, {
        page: skip,
        pageSize: take,
        userId: Number(req.params.userId),
      });

      if (error) {
        throw new BadRequestError(
          "Missing or invalid params",
          PostErrorCode.MISSING_OR_INVALID_PARAMS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const posts = await this.postService.getPostsByUserId(
        value.page,
        value.pageSize,
        userId,
      );

      res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }
}
