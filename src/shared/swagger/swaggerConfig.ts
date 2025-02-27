import { applicationConfig } from "@/config";

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
  tags: [],
  paths: {},
};
