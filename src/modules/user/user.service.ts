import { BadRequestException, Injectable } from "@nestjs/common";
import { User, UserDoc } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import CreateUser from "../auth/dtos/create-user";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private dbUsers: Model<User>) {}

  async create(user: CreateUser): Promise<UserDoc> {
    const userWithNameOrEmail = await this.dbUsers.findOne({
      $or: [{ email: user.email }, { username: user.username }]
    });

    if (userWithNameOrEmail)
      throw new BadRequestException("User with such email or username already exist!");

    const hashedPassword = await bcrypt.hash(user.password, await bcrypt.genSalt());

    return this.dbUsers.create({ ...user, password: hashedPassword } satisfies User);
  }

  async getByUsernameOrEmail(usernameOrEmail: string): Promise<UserDoc> {
    return this.dbUsers.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] }).exec();
  }

  async getAll(): Promise<UserDoc[]> {
    return this.dbUsers.where().exec();
  }

  async getById(id: mongoose.Types.ObjectId): Promise<UserDoc> {
    return this.dbUsers.findById(id);
  }

  async deleteById(id: mongoose.Types.ObjectId ) {
    return this.dbUsers.deleteOne({ _id: id })
  }
}
