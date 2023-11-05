import { Reflector } from '@nestjs/core';
import { Role } from "../user/schemas/user.schema";

export const Roles = Reflector.createDecorator<Role[]>();
