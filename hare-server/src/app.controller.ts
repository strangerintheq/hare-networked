import {Controller, Get} from '@nestjs/common';
import {MapService} from './map.service';
import {Cell} from "./data/Cell";


@Controller()
export class AppController {

    constructor(private readonly mapService: MapService) {}

    @Get('/sector/')
    index(): Cell[][] {
        return this.mapService.getSector(0,0);
    }
}
