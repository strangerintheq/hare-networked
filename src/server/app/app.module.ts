import { Module } from '@nestjs/common';

import { MapService } from '../services/map.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppGateway } from "./app.gateway";
import {PlayersService} from "../services/players.service";

let staticModule = ServeStaticModule.forRoot({
  rootPath: 'static',
});

@Module({
  imports: [staticModule],
  providers: [MapService, PlayersService, AppGateway],
})
export class AppModule {}
