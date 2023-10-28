import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GetUserByIdParamsDTO } from "./dtos/get-user-by-id-params-dto";
import { Type } from "class-transformer";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ObjectIdPipe } from "../../util/pipes/object-id-pipe";

const users = [
  { id: 0, name: "first" },
  { id: 1, name: "second" },
  { id: 2, name: "third" }
];

@Controller("user")
export class UserController {

  constructor(
    @InjectModel(User.name) private user: Model<User>
  ) {
  }

  @Get()
  getAll() {
    return users;
  }

  @Get("/test")
  async create(): Promise<User> {
    return new this.user({
      name: "test1",
      age: 777
    }).save();
  }

  @Get("/:id")
  async getById(@Param("id", ObjectIdPipe) id: mongoose.Types.ObjectId) {
    const res = await this.user.findById(id).exec();

    if (!res)
      throw new NotFoundException();

    return res;
  }
}
