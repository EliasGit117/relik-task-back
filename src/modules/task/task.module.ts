import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./schemas/task.schema";
import { TaskController } from "./task.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Task.name,
      schema: TaskSchema
    }]),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [
    TaskService
  ],
  exports: [
    TaskService
  ]
})
export class TaskModule {}
