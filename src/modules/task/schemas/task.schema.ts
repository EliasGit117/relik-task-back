import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TaskDoc = HydratedDocument<Task>;

@Schema({ versionKey: false })
export class Task {

  @Prop({ minlength: 3 })
  name: string;

  @Prop({ minlength: 3 })
  description: string;

  @Prop({ type: Date })
  deadline?: Date;

  @Prop({ default: () => Date.now() })
  created: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
