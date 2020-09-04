import { Resolver, Query } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "hello world";
  }
}

// how graphql works ?
// - you create a class
// - add a notiations to it is optional @resolver
// - we will add actions that caan be query or notation

// in typescript we should identify the query args like this @Query(() => String)
