import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { TaskModule } from "./modules/task/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
          uri: config.get<string>("DATABASE_STRING"),
          dbName: "main"
      })
    }),
    PassportModule,
    UserModule,
    AuthModule,
    TaskModule
  ],
  providers: []
})
export class AppModule {
}
