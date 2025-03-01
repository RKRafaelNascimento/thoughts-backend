import { Router } from "express";
import { FollowControllerFactory } from ".";
import { AuthMiddleware } from "@/shared/middlewares";

const route = Router();

const followControler = FollowControllerFactory.getInstance();

route.post(
  "/follow/:followedId",
  AuthMiddleware.authorizeUser,
  followControler.follow.bind(followControler),
);
route.delete(
  "/follow/:followedId",
  AuthMiddleware.authorizeUser,
  followControler.unfollow.bind(followControler),
);

export default route;
