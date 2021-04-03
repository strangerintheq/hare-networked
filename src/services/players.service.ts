import {Injectable} from '@nestjs/common';
import {Player} from "../data/Player";
import {Cell} from "../data/Cell";

function rndCrd() {
    return ((Math.random()*21)|0)-10;
}

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
        player.x0 = player.x1 = rndCrd();
        player.y0 = player.y1 = rndCrd();
        player.a0 = player.a1 = 0;
        return player;
    }

    getPlayersInSector(sx: number, sy: number): Player[] {
        return [...this.connectedPlayers.values()];
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

        const nextCell = new Cell(player.x1, player.y1,0,0)

        return nextCell;
    }
}
