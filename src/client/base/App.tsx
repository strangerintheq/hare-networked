import React, {useState} from 'react';

import {World} from "../world/World";
import {PlayerObj} from "./PlayerObj";
import {Atmosphere} from "../world/Atmosphere";
import {Cell} from "../../data/Cell";
import {Player} from "../../data/Player";
import {ServerEvent} from "../../data/ServerEvent";
import {clientId, sendClientEvent, useServerEvent} from "./Socket";
import {ClientEvent} from "../../data/ClientEvent";
import {Background} from "./Background";
import {DialogCloud} from "./DialogCloud";
import {AnimationState} from "./AnimationState";
import {Anim} from "../world/animations/Anim";
import {AnimationType} from "../../data/AnimationType";
import {DialogCloudState} from "./DialogCloudState";
import {Canvas} from "@react-three/fiber";

const style = {height: '100vh', width: '100vw'};
const camera = {zoom: 50, position: [15, 15, 15]};


export const App = () => {

    const [animations, setAnimations] = useState<AnimationState[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [cells, setCells] = useState<Cell[]>([]);
    const [cloudDialog, setCloudDialog] = useState<DialogCloudState|undefined>(undefined);

    function addAnimation(a: AnimationState, t: number) {
        const inPlaying = animations.filter((a:AnimationState) => {
            return  t - a.player.t < 1000
        });
        setAnimations([...inPlaying, a]);
    }

    useServerEvent(ServerEvent.PLAYER_ENTERED_SECTOR, (player: Player) => {
        player.t = Date.now();
        setPlayers([...players, player]);
    }, [players]);

    useServerEvent(ServerEvent.PLAYER_EXITED_SECTOR, (id) => {
        setPlayers(players.filter(p => p.id !== id));
    }, [players]);

    useServerEvent(ServerEvent.SECTOR_INIT_DATA, ({sector, players}) => {
        setCells(sector.flat().map(toCell))
        const d = Date.now() - 1000;
        setPlayers(players.map(p => {
            p.t = d;
            return p
        }));
    });

    useServerEvent(ServerEvent.PLAYER_MOVED, (player: Player) => {
        player.t = Date.now();
        setPlayers(players.map(p => player.id === p.id ? player : p));
        if (player.animation === AnimationType.WATER_SPLASH)
            addAnimation(new AnimationState(AnimationType.WATER_SPLASH, player),  player.t);
        if (player.id === clientId)
            setCloudDialog(player.action && new DialogCloudState(player.action, player))
    }, [players, animations]);

    const onClick = (e) => {
        e.stopPropagation();
        const p = e.object.parent.position;
        sendClientEvent(ClientEvent.CLICK_ON_CELL, {x: p.x, y: p.z})
    };

    console.log(players)
    //@ts-ignore
    return <Canvas orthographic shadows={true} camera={camera} style={style}>
        <Background />
        <Atmosphere />
        <World cells={cells} onClick={onClick} />
        {players.map(p => <PlayerObj key={p.id} p={p} />)}
        {animations.map(anim=> <Anim animation={anim} key={anim.id} />)}
        <DialogCloud params={cloudDialog}/>
    </Canvas>
};

function toCell(c:Cell){
    let cell = new Cell(c.x, c.y, c.sx, c.sy);
    cell.height = c.height
    cell.type = c.type
    cell.object = c.object;
    return cell;
}