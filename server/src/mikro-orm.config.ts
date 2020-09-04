import path from "path";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post, User],
  dbName: "lereddit",
  debug: process.env.NODE_ENV !== "production",
  type: "postgresql",
  user: "zaid",
  password: "123456",
} as const;
