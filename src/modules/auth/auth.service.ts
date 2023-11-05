import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import UserForSignIn from "./dtos/user-for-sign-in";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import CreateUser from "./dtos/create-user";
import { UserDoc } from "../user/schemas/user.schema";

const wrongSignInMessage = "Invalid credentials";

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(userForSignIn: UserForSignIn) {

    const user = await this.userService.getByUsernameOrEmail(userForSignIn.usernameOrEmail);

    if (!user) {
      throw new BadRequestException(wrongSignInMessage);
    }

    const isPasswordValid = await bcrypt.compare(userForSignIn.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException(wrongSignInMessage);
    }

    return {
      token: await this.generateJwt(user),
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    };
  }

  async signUp(userForSignUp: CreateUser) {
    const user = await this.userService.create(userForSignUp);

    return {
      token: await this.generateJwt(user),
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    };
  }


  private async generateJwt(user: UserDoc) {
    return this.jwtService.signAsync({
      sub: user._id,
      username: user.username,
      role: user.role
    });
  }


  async validateToken(token: string) {
    return await this.jwtService.verify(token, {
      secret: this.jwtSecret
    });
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
