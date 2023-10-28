import { IsNumber, IsNumberString } from "class-validator";
import { Type } from "class-transformer";

export class GetUserByIdParamsDTO {
  @IsNumber()
  @Type(() => Number)
  public id: number;
}
