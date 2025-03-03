export const repostSwagger = {
  tags: [
    {
      name: "Repost",
      description: "Endpoints for reposting and managing reposts.",
    },
  ],
  paths: {
    "/repost/{originalPostId}": {
      post: {
        tags: ["Repost"],
        summary: "Create a repost",
        description:
          "Allows an authenticated user to repost another user's post.",
        parameters: [
          {
            name: "originalPostId",
            in: "path",
            required: true,
            description: "ID of the original post being reposted.",
            schema: {
              type: "integer",
              example: 123,
            },
          },
          {
            name: "user_id",
            in: "header",
            required: true,
            description: "ID of the authenticated user making the repost.",
            schema: {
              type: "integer",
              example: 3,
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  content: {
                    type: "string",
                    description: "Content of the post.",
                    example: "This is my first post!",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Successfully created the repost.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 10,
                    },
                    userId: {
                      type: "number",
                      example: 3,
                    },
                    originalPostId: {
                      type: "number",
                      example: 123,
                    },
                    content: {
                      type: "string",
                      nullable: true,
                      example: "Great post!",
                    },
                    sentiment: {
                      type: "string",
                      enum: ["pos", "neg", "neutral"],
                      nullable: true,
                      example: "neutral",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      example: "2025-03-03T12:00:00Z",
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
          403: {
            description: "Forbidden - User cannot repost their own post.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "YOU_CANNOT_REPOST_OWN_POST",
                    },
                    statusCode: {
                      type: "number",
                      example: 403,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "FORBIDDEN",
                    },
                    description: {
                      type: "string",
                      example: "You cannot repost your own post",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found - Original post not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "ORIGINAL_POST_NOT_FOUND",
                    },
                    statusCode: {
                      type: "number",
                      example: 404,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "NOT_FOUND",
                    },
                    description: {
                      type: "string",
                      example: "Original post not found",
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "Conflict - User has already reposted this content.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "YOU_ALREADY_REPOSTED",
                    },
                    statusCode: {
                      type: "number",
                      example: 409,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "CONFLICT",
                    },
                    description: {
                      type: "string",
                      example: "You have already reposted this content",
                    },
                  },
                },
              },
            },
          },
          429: {
            description:
              "Too Many Requests - User has reached daily repost limit.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "DAILY_POST_LIMIT_REACHED",
                    },
                    statusCode: {
                      type: "number",
                      example: 429,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "TOO_MANY_REQUESTS",
                    },
                    description: {
                      type: "string",
                      example:
                        "You have reached the daily limit of 5 posts. Please try again tomorrow.",
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
