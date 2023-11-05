import { Injectable } from "@nestjs/common";
import CreateTask from "./dtos/create-task";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Task } from "./schemas/task.schema";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private dbTasks: Model<Task>) {}

  async create(task: CreateTask) {
    return this.dbTasks.create({ ...task } as Task);
  }

  async getAll() {
    return this.dbTasks.find().sort({ created: -1 });
  }

  async getById(id: ObjectId) {
    return this.dbTasks.findById(id);
  }

  async replace(id: ObjectId, task: CreateTask) {
    return this.dbTasks.findByIdAndUpdate(id, task, { new: true });
  }

  async delete(id: ObjectId) {
    return this.dbTasks.findByIdAndDelete(id);
  }
}
