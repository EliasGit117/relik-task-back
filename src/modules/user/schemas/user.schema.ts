import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";

export enum Role {
  user = 'user',
  admin = 'admin'
}

export type UserDoc = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {

  @Prop({ unique: true, minlength: 6 })
  username: string;

  @Prop({ unique: true, minlength: 6 })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: Role, default: Role.user })
  role?: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
