import React, {useState} from 'react';
import {Canvas} from "react-three-fiber";
import {World} from "../world/World";
import {PlayerObj} from "./PlayerObj";
import {Atmosphere} from "../world/Atmosphere";
import {Cell} from "../../../hare-server/src/data/Cell";
import {Player} from "../../../hare-server/src/data/Player";
import {ServerEvent} from "../../../hare-server/src/data/ServerEvent";
import {sendClientEvent, useServerEvent} from "./Socket";
import {ClientEvent} from "../../../hare-server/dist/data/ClientEvent";
import {Background} from "./Background";
import {DialogCloud} from "./DialogCloud";

export const App = () => {

    const [players, setPlayers] = useState<Player[]>([]);
    const [cells, setCells] = useState<Cell[]>([]);

    useServerEvent(ServerEvent.PLAYER_CONNECTED, (player: Player) => {
        player.t = Date.now();
        setPlayers([...players, player]);
    }, [players]);

    useServerEvent(ServerEvent.PLAYER_DISCONNECTED, (id) => {
        setPlayers(players.filter(p => p.id !== id));
    }, [players]);

    useServerEvent(ServerEvent.ENTER_SECTOR, ({sector, players}) => {
        setCells(sector.flat().map(c => {
            let cell = new Cell(c.x, c.y, c.sx, c.sy);
            cell.height = c.height
            cell.type = c.type
            cell.object = c.object;
            return cell;
        }))
        const d = Date.now()-1000;
        setPlayers(players.map(p => {
            p.t = d;
            return p
        }));
    });

    const onClick = (e) => {
        e.stopPropagation();
        const p = e.object.parent.position;
        sendClientEvent(ClientEvent.CLICK_ON_CELL, {x: p.x, y: p.z})
    };

    return <Canvas orthographic
                   colorManagement
                   shadowMap
                   camera={{zoom: 50, position: [15, 15, 15]}}
                   style={{height: '100vh', width: '100vw'}}>


        <Background />
        <Atmosphere/>
        <World cells={cells} onClick={onClick}/>
        {players.map(p => <PlayerObj key={p.id} p={p} />)}
        <DialogCloud/>
    </Canvas>
};