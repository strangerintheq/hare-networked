import {Injectable} from '@nestjs/common';
import {Player} from "../data/Player";

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
        player.x0 = player.x1 = (Math.random()*21)|0-10;
        player.y0 = player.y1 = (Math.random()*21)|0-10;
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
}
