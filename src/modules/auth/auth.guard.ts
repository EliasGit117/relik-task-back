import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
  ForbiddenException
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;

      if (!authorization || authorization.trim() === "") {
        throw new UnauthorizedException("Please provide token");
      }

      const authToken = authorization.replace(/bearer/gim, "").trim();
      request.decodedData = await this.authService.validateToken(authToken);

      const validRoles = this.reflector.get(Roles, context.getHandler());
      const decodedToken = await this.authService.decodeToken(authToken);

      if (!validRoles)
        return true;

      if (!validRoles.includes(decodedToken["role"])) {
        throw new UnauthorizedException("Your role can't access this resource");
      }

      return true;

    } catch (error) {
      console.log("auth error - ", error.message);
      throw new ForbiddenException(error.message || "session expired! Please sign In");
    }
  }
}
