import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

// we will convert the Entity into a typescript graphql way
@ObjectType()
@Entity()
export class Post {
  @Field() // this is mandatory
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text" })
  title!: string;
}

// before typescript

// @Entity()
// export class Post {
//   @PrimaryKey()
//   id!: number;

//   @Property({ type: "date" })
//   createdAt = new Date();

//   @Property({ type: "date", onUpdate: () => new Date() })
//   updatedAt = new Date();

//   @Property({ type: "text" })
//   title!: string;
// }
