import { Router } from "express";
import { AuthMiddleware } from "@/shared/middlewares";
import { UserServiceController } from ".";

const route = Router();

const userController = UserServiceController.getInstance();

route.get(
  "/user",
  AuthMiddleware.authorizeUser,
  userController.getUserProfile.bind(userController),
);

export default route;
