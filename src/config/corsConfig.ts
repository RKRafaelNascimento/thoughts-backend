import { CorsOptions } from "cors";
export const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
} as CorsOptions;
