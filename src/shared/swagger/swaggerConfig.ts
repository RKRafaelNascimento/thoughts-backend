import { applicationConfig } from "@/config";
import { followSwagger } from "@/modules/Follow/swagger/Follow.swagger";
import { postSwagger } from "@/modules/Post/swagger/Post.swagger";
import { repostSwagger } from "@/modules/Repost/swagger/Repost.swagger";
import { userSwagger } from "@/modules/User/swagger/User.swagger";

export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Comprehensive documentation for all API endpoints",
  },
  servers: [
    {
      url: `http://localhost:${applicationConfig.port}`,
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  tags: [
    ...followSwagger.tags,
    ...postSwagger.tags,
    ...repostSwagger.tags,
    ...userSwagger.tags,
  ],
  paths: {
    ...followSwagger.paths,
    ...postSwagger.paths,
    ...repostSwagger.paths,
    ...userSwagger.paths,
  },
};
