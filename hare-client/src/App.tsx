import React, {useState} from 'react';
import {Canvas, useFrame} from "react-three-fiber";
import {Ground} from "./Ground";
import {Players} from "./Players";
import {Atmosphere} from "./Atmosphere";
import {Cell} from "../../hare-server/src/data/Cell";
import {Player} from "../../hare-server/src/data/Player";
import {ServerEvent} from "../../hare-server/src/data/ServerEvent";
import {useServerEvent} from "./Socket";

export const App = () => {

    const [players, setPlayers] = useState<Player[]>([]);
    const [cells, setCells] = useState<Cell[]>([]);

    useServerEvent(ServerEvent.PLAYER_CONNECTED, (player: Player) => {
        player.t = Date.now();
        setPlayers([...players, player]);
    });

    useServerEvent(ServerEvent.PLAYER_DISCONNECTED, (id: string) => {
        console.log('PLAYER_DISCONNECTED', id)
        setPlayers(players.filter(p => p.id !== id));
    });

    useServerEvent(ServerEvent.ENTER_SECTOR, ({sector, players}) => {
        setCells(sector.flat().map(c => {
            let cell = new Cell(c.x,c.y,c.sx,c.sy);
            cell.height = c.height
            return cell;
        }))
        let d = Date.now();
        setPlayers(players.map(p => {
            p.t = d;
            return p
        }));
    });

    return <Canvas orthographic
                camera={{zoom: 50, position:[15,15,15]}}
                style={{height:'100vh', width:'100vw'}}>
        <Atmosphere/>
        <Ground cells={cells} />
        <Players players={players}/>
    </Canvas>
};