import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolver/hello";
import { PostResolver } from "./resolver/post";
import { UserResolver } from "./resolver/user";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig); // connecting to the DB
  await orm.getMigrator().up(); // create migration before executing

  const app = express();
  const apolloServer = new ApolloServer({
    // we should first build our schema
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("running on port localhost:5000");
  });
};

main().catch((err) => console.error(err));

console.log("helo");
