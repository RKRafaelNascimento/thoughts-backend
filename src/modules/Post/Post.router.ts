import { Router } from "express";
import { AuthMiddleware } from "@/shared/middlewares";
import { PostControllerFactory } from ".";

const route = Router();

const postController = PostControllerFactory.getInstance();

route.post(
  "/post",
  AuthMiddleware.authorizeUser,
  postController.create.bind(postController),
);

route.get(
  "/post/feed",
  AuthMiddleware.authorizeUser,
  postController.getFeed.bind(postController),
);

route.get(
  "/post/:userId",
  postController.getPostsByUserId.bind(postController),
);

export default route;
