import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppGateway } from "./app.gateway";

let staticModule = ServeStaticModule.forRoot({
  rootPath: '../hare-client/build',
});

@Module({
  imports: [staticModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
