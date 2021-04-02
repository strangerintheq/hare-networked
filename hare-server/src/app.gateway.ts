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
        //this.logger.log(`Client disconnected: ${client.id}`);
        const id = this.playersService.playerDisconnected(client.id);
        this.server.emit(ServerEvent.PLAYER_DISCONNECTED, id);
    }

    @SubscribeMessage(ClientEvent.JOIN)
    joinMsg(client: Socket, id: string): void {
        //this.logger.log(`joinMsg: ${client.id} ${id}`);
        const player = this.playersService.playerConnected(id, client.id)
        const sector = this.mapService.getSector(0, 0);
        const players = this.playersService.getPlayersInSector(0, 0);
        client.emit(ServerEvent.ENTER_SECTOR, {sector, players})
        client.broadcast.emit(ServerEvent.PLAYER_CONNECTED, player);
    }

    @SubscribeMessage(ClientEvent.CLICK_ON_CELL)
    clickOnCell(client: Socket, cell: Cell): void {
        //this.logger.log(`clickOnCell: ${client.id} ${cell}`);
        const player = this.playersService.getPlayerByWsId(client.id);
        this.playersService.calcMove(player, cell);
        player.h1 = this.mapService.getCellHeight(cell);
        this.server.emit(ServerEvent.PLAYER_MOVED, player)
    }

    @SubscribeMessage(ClientEvent.INVOKE_CELL_ACTION)
    invokeCellAction(client: Socket, cell: Cell): void {
        this.logger.log('invokeCellAction');
        this.logger.log(cell)
    }
}