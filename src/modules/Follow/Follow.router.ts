import { Router } from "express";
import { FollowControllerFactory } from ".";

const route = Router();

const followControler = FollowControllerFactory.getInstance();

route.post("/follow/:followedId", followControler.follow.bind(followControler));
route.delete(
  "/follow/:followedId",
  followControler.unfollow.bind(followControler),
);

export default route;
