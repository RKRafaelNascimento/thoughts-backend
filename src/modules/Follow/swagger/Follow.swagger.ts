export const followSwagger = {
  tags: [
    {
      name: "Follow",
      description: "Endpoints for following and unfollowing users.",
    },
  ],
  paths: {
    "/follow/{followedId}": {
      post: {
        tags: ["Follow"],
        summary: "Follow a user",
        description: "Allows an authenticated user to follow another user.",
        parameters: [
          {
            name: "followedId",
            in: "path",
            required: true,
            description: "ID of the user to follow.",
            schema: {
              type: "integer",
              example: 123,
            },
          },
          {
            name: "user_id",
            in: "header",
            required: true,
            description: "ID of the authenticated user making the request.",
            schema: {
              type: "integer",
              example: 3,
            },
          },
        ],
        responses: {
          200: {
            description: "Successfully followed the user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 1,
                    },
                    followerId: {
                      type: "number",
                      example: 3,
                    },
                    followedId: {
                      type: "number",
                      example: 123,
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
                examples: {
                  missingUserId: {
                    summary: "User ID is missing or invalid",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMS",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "User ID is missing or invalid",
                    },
                  },
                  invalidParams: {
                    summary: "Missing or invalid params",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMS",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "Missing or invalid params",
                    },
                  },
                  selfFollow: {
                    summary: "You cannot follow yourself",
                    value: {
                      code: "YOU_CANNOT_UNFOLLOW_OR_FOLLOW_YOURSELF",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "You cannot follow or unfollow yourself.",
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
          404: {
            description: "Not Found - Follower or followed user not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "FOLLOWER_NOT_FOUND",
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
                      example: "Follower not found",
                    },
                  },
                },
                examples: {
                  followerNotFound: {
                    summary: "Follower not found",
                    value: {
                      code: "FOLLOWER_NOT_FOUND",
                      statusCode: 404,
                      statusCodeAsString: "NOT_FOUND",
                      description: "Follower not found",
                    },
                  },
                  followedNotFound: {
                    summary: "Followed user not found",
                    value: {
                      code: "FOLLOWED_NOT_FOUND",
                      statusCode: 404,
                      statusCodeAsString: "NOT_FOUND",
                      description: "Followed user not found",
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "Conflict - User already follows the target user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "ALREADY_FOLLOW_USER",
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
                      example: "You already follow this user",
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
      delete: {
        tags: ["Follow"],
        summary: "Unfollow a user",
        description:
          "Allows an authenticated user to unfollow another user. The request must include the 'user_id' in the header.",
        parameters: [
          {
            name: "followedId",
            in: "path",
            required: true,
            description: "ID of the user to unfollow.",
            schema: {
              type: "integer",
              example: 123,
            },
          },
          {
            name: "user_id",
            in: "header",
            required: true,
            description: "ID of the authenticated user making the request.",
            schema: {
              type: "integer",
              example: 3,
            },
          },
        ],
        responses: {
          204: {
            description: "No Content - Successfully unfollowed the user.",
            content: {},
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
          404: {
            description: "Not Found - Follower or followed user not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "FOLLOWER_NOT_FOUND",
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
                      example: "Follower not found",
                    },
                  },
                },
              },
            },
          },
          409: {
            description: "Conflict - User does not follow the target user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "YOU_NOT_FOLLOW_USER",
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
                      example: "You do not follow this user",
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
