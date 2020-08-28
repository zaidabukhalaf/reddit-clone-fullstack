import { MikroORM } from "@mikro-orm/core";
// import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolver/hello";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig); // connecting to the DB
  await orm.getMigrator().up(); // create migration before executing
  // const post = orm.em.create(Post, { title: "my first post" }); // create post
  // await orm.em.persistAndFlush(post); // save the post

  // const posts = await orm.em.find(Post, {}); // get all posts in db
  // console.log(posts);

  const app = express();
  const apolloServer = new ApolloServer({
    // we should first build our schema
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("running on port localhost:5000");
  });
};

main().catch((err) => console.error(err));

console.log("helo");
