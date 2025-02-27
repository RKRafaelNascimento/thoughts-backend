import { Router } from "express";
import { FollowControllerFactory } from ".";

const route = Router();

const followControler = FollowControllerFactory.getInstance();

route.post("/follow", followControler.follow.bind(followControler));

export default route;
