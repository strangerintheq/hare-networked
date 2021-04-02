import React, {useState} from 'react';
import {Canvas} from "react-three-fiber";
import {Ground} from "./Ground";
import {PlayerObj} from "./PlayerObj";
import {Atmosphere} from "./Atmosphere";
import {Cell} from "../../hare-server/src/data/Cell";
import {Player} from "../../hare-server/src/data/Player";
import {ServerEvent} from "../../hare-server/src/data/ServerEvent";
import {sendClientEvent, useServerEvent} from "./Socket";
import {ClientEvent} from "../../hare-server/dist/data/ClientEvent";

export const App = () => {

    const [players, setPlayers] = useState<Player[]>([]);
    const [cells, setCells] = useState<Cell[]>([]);

    useServerEvent(ServerEvent.PLAYER_CONNECTED, (player: Player) => {
        player.t = Date.now();
        setPlayers([...players, player]);
    }, [players]);

    useServerEvent(ServerEvent.PLAYER_DISCONNECTED, (id) => {
        let filter = players.filter(p => p.id !== id);
        console.log(filter)
        return setPlayers(filter);
    }, [players]);

    useServerEvent(ServerEvent.ENTER_SECTOR, ({sector, players}) => {
        setCells(sector.flat().map(c => {
            let cell = new Cell(c.x, c.y, c.sx, c.sy);
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
                   colorManagement
                   shadowMap
                   camera={{zoom: 50, position: [15, 15, 15]}}
                   style={{height: '100vh', width: '100vw'}}>
        <Atmosphere/>
        <Ground cells={cells} onClick={(e) => {
            e.stopPropagation();
            let p = e.object.parent.position;
            //  console.log(p.x, p.z)
            sendClientEvent(ClientEvent.CLICK_ON_CELL, {x: p.x, y: p.z})
        }}/>
        <>
            {players.map(p => <PlayerObj key={p.id} p={p} />)}
        </>
    </Canvas>
};