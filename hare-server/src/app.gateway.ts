import {OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer,} from '@nestjs/websockets';

import {Logger} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {MapService} from "./services/map.service";
import {PlayersService} from "./services/players.service";
import {ServerEvent} from "./data/ServerEvent";
import {ClientEvent} from "./data/ClientEvent";
import {Cell} from "./data/Cell";
import {AnimationType} from "./data/AnimationType";
import {CellType} from "./data/CellType";

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
        let nextCell = this.playersService.calcMove(player, cell);
        nextCell = this.mapService.getCell(nextCell.x, nextCell.y,0,0)
        player.h1 = this.mapService.getCellHeight(nextCell);
        if (nextCell.isWater())
            player.h1 -= 0.4
        player.animation = nextCell.getCellAnimation();
        this.server.emit(ServerEvent.PLAYER_MOVED, player)
    }

    @SubscribeMessage(ClientEvent.INVOKE_CELL_ACTION)
    invokeCellAction(client: Socket, cell: Cell): void {
        this.logger.log('invokeCellAction');
        this.logger.log(cell)
    }
}