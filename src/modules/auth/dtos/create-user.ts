import { IsEmail, IsNotEmpty } from "class-validator";

export default class CreateUser {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
