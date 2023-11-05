import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import CreateTask from "./dtos/create-task";
import { ObjectIdPipe } from "../../core/pipes/object-id-pipe";
import { ObjectId } from "mongoose";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../user/schemas/user.schema";

@Controller("task")
@UseGuards(AuthGuard)
@Roles([Role.admin, Role.user])
export class TaskController {

  constructor(private taskService: TaskService) {}

  @Get()
  async getAll() {
    return await this.taskService.getAll();
  }

  @Get('/:id')
  async getById(@Param("id", ObjectIdPipe) id: ObjectId) {
    return await this.taskService.getById(id);
  }

  @Put('/:id')
  async replace(
    @Param("id", ObjectIdPipe) id: ObjectId,
    @Body() task: CreateTask
  ) {
    return await this.taskService.replace(id, task);
  }

  @Delete('/:id')
  async delete(@Param("id", ObjectIdPipe) id: ObjectId) {
    return await this.taskService.delete(id);
  }

  @Post()
  async create(@Body() task: CreateTask) {
    return await this.taskService.create(task);
  }

}
