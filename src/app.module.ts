import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get<string>("DATABASE_STRING"),
          dbName: "main"
        };
      }
    }),
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
