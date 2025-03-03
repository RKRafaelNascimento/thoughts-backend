export const userSwagger = {
  tags: [
    {
      name: "User",
      description: "Endpoints for user profile management.",
    },
  ],
  paths: {
    "/user": {
      get: {
        tags: ["User"],
        summary: "Get user profile",
        description: "Retrieves the profile details of the authenticated user.",
        parameters: [
          {
            name: "user_id",
            in: "header",
            required: true,
            description: "ID of the authenticated user requesting the profile.",
            schema: {
              type: "integer",
              example: 3,
            },
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved the user profile.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 3,
                    },
                    username: {
                      type: "string",
                      example: "john_doe",
                    },
                    joinedAt: {
                      type: "string",
                      format: "date-time",
                      example: "02/03/2025",
                    },
                    followersCount: {
                      type: "number",
                      example: 150,
                    },
                    followingCount: {
                      type: "number",
                      example: 100,
                    },
                    totalPosts: {
                      type: "number",
                      example: 75,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request - Missing or invalid parameters.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "MISSING_OR_INVALID_PARAMS",
                    },
                    statusCode: {
                      type: "number",
                      example: 400,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "BAD_REQUEST",
                    },
                    description: {
                      type: "string",
                      example: "User ID is missing or invalid",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized - User not authenticated.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "USER_NOT_AUTHORIZED",
                    },
                    statusCode: {
                      type: "number",
                      example: 401,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "UNAUTHORIZED",
                    },
                    description: {
                      type: "string",
                      example: "Unauthorized access",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error - Unexpected error occurred.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "INTERNAL_SERVER_ERROR",
                    },
                    statusCode: {
                      type: "number",
                      example: 500,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "INTERNAL_SERVER_ERROR",
                    },
                    description: {
                      type: "string",
                      example: "Internal server error",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
