import { Router } from "express";
import { AuthMiddleware } from "@/shared/middlewares";
import { RepostControllerFactory } from ".";

const route = Router();

const repostController = RepostControllerFactory.getInstance();

route.post(
  "/repost/:originalPostId",
  AuthMiddleware.authorizeUser,
  repostController.create.bind(repostController),
);

export default route;
