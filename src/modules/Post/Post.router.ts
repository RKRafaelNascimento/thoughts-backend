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

export default route;
