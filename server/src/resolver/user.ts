import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  Ctx,
  ObjectType,
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";
import argon2 from "argon2";
import { EntityManager } from "@mikro-orm/postgresql";

@InputType()
class UsernamePassword {
  @Field()
  username: string;
  @Field()
  password: string;
}
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePassword,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 3) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 3",
          },
        ],
      };
    }
    if (options.password.length <= 6) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 6",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    // const user = em.create(User, {
    //   username: options.username,
    //   password: hashedPassword,
    // });
    let user;
    try {
      // await em.persistAndFlush(user);
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          username: options.username,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
      user = result;
    } catch (error) {
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken ",
            },
          ],
        };
      }
    }
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePassword,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "invalid Username or Password",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, options.password);
    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "invalid Username or Password",
          },
        ],
      };
    }

    req.session.userId = user.id;
    return {
      user,
    };
  }
}
