import { IsEmail, IsNotEmpty } from "class-validator";

export default class UserForSignIn {
  @IsNotEmpty()
  usernameOrEmail: string;

  @IsNotEmpty()
  password: string;
}
