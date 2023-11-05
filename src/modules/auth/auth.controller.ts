import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import CreateUser from "./dtos/create-user";
import UserForSignIn from "./dtos/user-for-sign-in";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Roles } from "./roles.decorator";
import { Role } from "../user/schemas/user.schema";

@Controller("auth")
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() userForSignIn: UserForSignIn) {
    return await this.authService.signIn(userForSignIn);
  }

  @Post('sign-up')
  async create(@Body() userForCreation: CreateUser) {
    return await this.authService.signUp(userForCreation);
  }

  @Get('test')
  @UseGuards(AuthGuard)
  @Roles([Role.user, Role.admin])
  async test(@Req() req: Request) {
    const decodedToken = await this.authService.decodeToken(req.headers['authorization']);
    return decodedToken['role'];
  }

}
