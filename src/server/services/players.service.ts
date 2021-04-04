import {Injectable} from '@nestjs/common';
import {Player} from "../../data/Player";
import {Cell} from "../../data/Cell";
import {AnimalType} from "../../data/AnimalType";

@Injectable()
export class PlayersService {

    private allPlayers = new Map<string, Player>();
    private connectedPlayers = new Map<string, Player>();

    playerConnected(id: string, wsId: string): Player {
        const connectedPlayer = this.allPlayers.has(id) ?
            this.allPlayers.get(id) : this.newPlayer(id);
        connectedPlayer.wsId = wsId;
        this.allPlayers.set(id, connectedPlayer);
        this.connectedPlayers.set(wsId, connectedPlayer);
        return connectedPlayer
    }

    newPlayer(id: string) {
        let player = new Player();
        player.id = id;
        player.sx = player.sy =
        player.x0 = player.x1 =
        player.y0 = player.y1 =
        player.a0 = player.a1 = 0;
        player.animal = Math.random() > 0.5 ? AnimalType.HARE : AnimalType.FROG
        return player;
    }

    getPlayersInSector(sx: number, sy: number): Player[] {
        return [...this.connectedPlayers.values()]
            .filter(p => sx === p.sx && sy===p.sy);
    }

    playerDisconnected(wsId: string): string | undefined {
        let playerByWsId = this.getPlayerByWsId(wsId);
        if (!playerByWsId)
            return
        const id = playerByWsId.id;
        this.connectedPlayers.delete(wsId);
        return id;
    }

    getPlayerByWsId(wsId: string) : Player{
        return this.connectedPlayers.get(wsId)
    }

    calcMove(player: Player, cell: Cell): Cell {
        player.x0 = player.x1;
        const dx = Math.sign(player.x1 - cell.x);
        player.x1 -= dx;

        player.y0 = player.y1;
        const dy = Math.sign(player.y1 - cell.y);
        player.y1 -= dy;

        player.a0 = player.a1;
        if (dx * dx + dy * dy !== 0)
            player.a1 = Math.atan2(-dx, -dy);

        player.h0 = player.h1;

        cell.sx = player.sx;
        cell.sy = player.sy

        player.sx += (player.x1/10)|0;
        player.sy += (player.y1/10)|0;

        let hs = (Cell.sectorSize-1)/2

        if (Math.abs(player.x1) === hs)
            player.x1 = -Math.sign(player.x1)*(hs-1)

        if (Math.abs(player.y1) === hs)
            player.y1 = -Math.sign(player.y1)*(hs-1)

        return new Cell(player.x1, player.y1,player.sx,player.sy);
    }
}
