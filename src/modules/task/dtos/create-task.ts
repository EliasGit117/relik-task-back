import { IsNotEmpty } from "class-validator";

export default class CreateTask {
  @IsNotEmpty()
  name: string;

  description?: string;
  deadline?: Date;
}
