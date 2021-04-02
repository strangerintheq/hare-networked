import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {MapService} from "./services/map.service";
import {PlayersService} from "./services/players.service";
import {ServerEvent} from "./data/ServerEvent";
import {ClientEvent} from "./data/ClientEvent";
import {Cell} from "./data/Cell";

@WebSocketGateway()
export class AppGateway implements OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AppGateway');

    constructor(
        readonly mapService: MapService,
        readonly playersService: PlayersService
    ) {}

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        const id = this.playersService.playerDisconnected(client.id);
        this.server.emit(ServerEvent.PLAYER_DISCONNECTED, id);
    }

    @SubscribeMessage(ClientEvent.JOIN)
    joinMsg(client: Socket, id: string): void {
        this.logger.log(`joinMsg: ${client.id} ${id}`);
        const player = this.playersService.playerConnected(id, client.id)
        const sector = this.mapService.getSector(0, 0);
        const players = this.playersService.getPlayersInSector(0, 0);
        client.emit(ServerEvent.ENTER_SECTOR, {sector, players})
        client.broadcast.emit(ServerEvent.PLAYER_CONNECTED, player);
    }

    @SubscribeMessage(ClientEvent.CLICK_ON_CELL)
    clickOnCell(client: Socket, cell: Cell): void {
        this.logger.log(`clickOnCell: ${client.id} ${cell}`);
        const player = this.playersService.getPlayerByWsId(client.id);
        player.x0 = player.x1;
        player.y0 = player.y1;
        let dx = Math.sign(player.x1 - cell.x);
        let dy = Math.sign(player.y1 - cell.y);
        player.x1 -= dx;
        player.y1 -= dy;

        // let x = hare.obj.position.x - dx;
        // let z = hare.obj.position.z - dz;
        // let loc = [x, 0, z];
        // let nextCell = getCell(loc);
        // let w = isWater(nextCell);
        // let y = cellElevation(nextCell) * (w ? -1 : 1) + (w ? 0.55 : 1);

        if (dx * dx + dy * dy !== 0) {
            player.a0 = player.a1;
            player.a1 = Math.atan2(-dx, -dy);
        }

        this.server.emit(ServerEvent.PLAYER_MOVED, player)
    }

    @SubscribeMessage(ClientEvent.INVOKE_CELL_ACTION)
    invokeCellAction(client: Socket, cell: Cell): void {
        this.logger.log('invokeCellAction');
        this.logger.log(cell)
    }
}