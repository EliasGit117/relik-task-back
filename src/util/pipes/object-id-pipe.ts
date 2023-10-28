import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class ObjectIdPipe implements PipeTransform<any, mongoose.Types.ObjectId> {

  public transform(value: any): mongoose.Types.ObjectId {
    try {
      return new mongoose.Types.ObjectId(value);

    } catch (error) {
      throw new BadRequestException(
        "Validation failed (ObjectId is expected)"
      );
    }
  }
}
