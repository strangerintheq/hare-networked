import {OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer,} from '@nestjs/websockets';

import {Logger} from '@nestjs/common';
import {Server, Socket} from 'socket.io';
import {MapService} from "../services/map.service";
import {PlayersService} from "../services/players.service";
import {ServerEvent} from "../../data/ServerEvent";
import {ClientEvent} from "../../data/ClientEvent";
import {Cell} from "../../data/Cell";
import {CellObjectType} from "../../data/CellObjectType";
import {ActionType} from "../../data/ActionType";
import {Player} from "../../data/Player";

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
        //this.logger.log(`Client disconnected: ${client.clientId}`);
        const id = this.playersService.playerDisconnected(client.id);
        this.server.emit(ServerEvent.PLAYER_EXITED_SECTOR, id);
    }

    @SubscribeMessage(ClientEvent.JOIN)
    joinMsg(client: Socket, id: string): void {
        //this.logger.log(`joinMsg: ${client.clientId} ${clientId}`);
        const player = this.playersService.playerConnected(id, client.id)
        this.enterSector(client, player);
    }

    enterSector(client: Socket, player: Player){
        const sector = this.mapService.getSector(player.sx, player.sy);
        const players = this.playersService.getPlayersInSector(player.sx, player.sy);
        client.emit(ServerEvent.SECTOR_INIT_DATA, {sector, players})

        const room = Player.roomKey(player);
        client.join(room)
        client.to(room).emit(ServerEvent.PLAYER_ENTERED_SECTOR, player);
    }

    @SubscribeMessage(ClientEvent.CLICK_ON_CELL)
    clickOnCell(client: Socket, clickedOnCell: Cell): void {
        //this.logger.log(`clickOnCell: ${client.clientId} ${cell}`);
        const player = this.playersService.getPlayerByWsId(client.id);
        let nextCell = this.playersService.calcMove(player, clickedOnCell);
        nextCell = this.mapService.getCell(nextCell.x, nextCell.y,nextCell.sx,nextCell.sy)
        player.h1 = nextCell.height;
        player.action = nextCell.object === CellObjectType.CARROT ? ActionType.CARROT : undefined
        if (nextCell.isWater())
            player.h1 -= 0.4
        if (nextCell.sx !== clickedOnCell.sx || nextCell.sy !== clickedOnCell.sy) {
            let roomKey = Player.roomKey(clickedOnCell);
            client.to(roomKey).emit(ServerEvent.PLAYER_EXITED_SECTOR, player.id);
            client.leave(roomKey)
            this.enterSector(client, player);
        } else {
            player.animation = nextCell.getCellAnimation();
            this.server.to(Player.roomKey(player))
                .emit(ServerEvent.PLAYER_MOVED, player)
        }

    }

    @SubscribeMessage(ClientEvent.INVOKE_CELL_ACTION)
    invokeCellAction(client: Socket, cell: Cell): void {
        this.logger.log('invokeCellAction');
        this.logger.log(cell)
    }
}

