export const postSwagger = {
  tags: [
    {
      name: "Post",
      description: "Endpoints for creating and managing posts.",
    },
  ],
  paths: {
    "/post": {
      post: {
        tags: ["Post"],
        summary: "Create a new post",
        description:
          "Allows an authenticated user to create a new post. The request must include the 'user_id' in the header.",
        parameters: [
          {
            name: "user_id",
            in: "header",
            required: true,
            description: "ID of the authenticated user creating the post.",
            schema: {
              type: "integer",
              example: 3,
            },
          },
        ],
        requestBody: {
          required: true,
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
                required: ["content"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Successfully created the post.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 1,
                    },
                    userId: {
                      type: "number",
                      example: 3,
                    },
                    content: {
                      type: "string",
                      example: "This is my first post!",
                    },
                    sentiment: {
                      type: "string",
                      enum: ["pos", "neg", "neutral"],
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
          429: {
            description:
              "Too Many Requests - User has reached daily post limit.",
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
    "/post/feed": {
      get: {
        tags: ["Post"],
        summary: "Get user feed",
        description:
          "Retrieves the authenticated user's post feed. The request must include the 'user_id' in the header.",
        parameters: [
          {
            name: "user_id",
            in: "header",
            required: true,
            description: "ID of the authenticated user requesting the feed.",
            schema: {
              type: "integer",
              example: 3,
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "Page number for pagination.",
            schema: {
              type: "integer",
              example: 1,
            },
          },
          {
            name: "pageSize",
            in: "query",
            required: false,
            description: "Number of posts per page (max: 100).",
            schema: {
              type: "integer",
              example: 10,
              maximum: 100,
            },
          },
          {
            name: "filter",
            in: "query",
            required: false,
            description: "Filter posts (only 'following' is allowed).",
            schema: {
              type: "string",
              enum: ["following"],
              example: "following",
            },
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved the feed.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                        example: 1,
                      },
                      userId: {
                        type: "number",
                        example: 3,
                      },
                      content: {
                        type: "string",
                        example: "This is a post in the feed!",
                      },
                      sentiment: {
                        type: "string",
                        enum: ["pos", "neg", "neutral"],
                        example: "neutral",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-03-03T12:00:00Z",
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            example: 2,
                          },
                          username: {
                            type: "string",
                            example: "john_doe",
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-03-01T10:00:00Z",
                          },
                        },
                      },
                      Repost: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "number",
                              example: 5,
                            },
                            userId: {
                              type: "number",
                              example: 4,
                            },
                            originalPostId: {
                              type: "number",
                              example: 1,
                            },
                            content: {
                              type: "string",
                              nullable: true,
                              example: "This is a repost!",
                            },
                            sentiment: {
                              type: "string",
                              nullable: true,
                              enum: ["pos", "neg", "neutral"],
                              example: "pos",
                            },
                            user: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "number",
                                  example: 4,
                                },
                                username: {
                                  type: "string",
                                  example: "repost_user",
                                },
                                createdAt: {
                                  type: "string",
                                  format: "date-time",
                                  example: "2024-03-02T15:30:00Z",
                                },
                              },
                            },
                            createdAt: {
                              type: "string",
                              format: "date-time",
                              example: "2025-03-03T14:00:00Z",
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
        },
      },
    },
    "/post/{userId}": {
      get: {
        tags: ["Post"],
        summary: "Get posts by user ID",
        description: "Retrieves all posts from a specific user.",
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            description: "ID of the user whose posts will be retrieved.",
            schema: {
              type: "integer",
              example: 2,
            },
          },
          {
            name: "page",
            in: "query",
            required: false,
            description: "Page number for pagination.",
            schema: {
              type: "integer",
              example: 1,
            },
          },
          {
            name: "pageSize",
            in: "query",
            required: false,
            description: "Number of posts per page (max: 100).",
            schema: {
              type: "integer",
              example: 5,
              maximum: 100,
            },
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved the user's posts.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "number",
                        example: 1,
                      },
                      userId: {
                        type: "number",
                        example: 3,
                      },
                      content: {
                        type: "string",
                        example: "This is a post by the user!",
                      },
                      sentiment: {
                        type: "string",
                        enum: ["pos", "neg", "neutral"],
                        example: "neutral",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2025-03-03T12:00:00Z",
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            example: 2,
                          },
                          username: {
                            type: "string",
                            example: "john_doe",
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-03-01T10:00:00Z",
                          },
                        },
                      },
                      Repost: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "number",
                              example: 5,
                            },
                            userId: {
                              type: "number",
                              example: 4,
                            },
                            originalPostId: {
                              type: "number",
                              example: 1,
                            },
                            content: {
                              type: "string",
                              nullable: true,
                              example: "This is a repost!",
                            },
                            sentiment: {
                              type: "string",
                              nullable: true,
                              enum: ["pos", "neg", "neutral"],
                              example: "pos",
                            },
                            user: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "number",
                                  example: 4,
                                },
                                username: {
                                  type: "string",
                                  example: "repost_user",
                                },
                                createdAt: {
                                  type: "string",
                                  format: "date-time",
                                  example: "2024-03-02T15:30:00Z",
                                },
                              },
                            },
                            createdAt: {
                              type: "string",
                              format: "date-time",
                              example: "2025-03-03T14:00:00Z",
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
