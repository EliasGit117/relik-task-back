import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { User } from "./schemas/user.schema";
import mongoose from "mongoose";
import { ObjectIdPipe } from "../../core/pipes/object-id-pipe";
import { UserService } from "./user.service";
import CreateUser from "../auth/dtos/create-user";
import * as bcrypt from 'bcrypt';

@Controller("user")
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Post()
  async create(@Body() userForCreation: CreateUser): Promise<User> {
    return await this.userService.create(userForCreation);
  }

  @Get("/:id")
  async getById(@Param("id", ObjectIdPipe) id: mongoose.Types.ObjectId) {
    const res = await this.userService.getById(id);

    if (!res) throw new NotFoundException();
    return res;
  }

  @Delete("/:id")
  async delete(@Param("id", ObjectIdPipe) id: mongoose.Types.ObjectId) {
    const res = await this.userService.deleteById(id);

    if (res.deletedCount <= 0)
      throw new NotFoundException();
  }
}
