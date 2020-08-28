import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
const main = async () => {
  const orm = await MikroORM.init(mikroConfig); // connecting to the DB
  await orm.getMigrator().up(); // create migration before executing
  // const post = orm.em.create(Post, { title: "my first post" }); // create post
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {}); // get all posts in db
  // console.log(posts);
};

main().catch((err) => console.error(err));

console.log("helo");