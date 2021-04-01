import * as React from "react";
import {Cube} from "./Cube";
import {CanvasContext, useFrame} from "react-three-fiber";
import {useServerEvent} from "./Socket";
import {ServerEvent} from "../../hare-server/src/data/ServerEvent";
import {Player} from "../../hare-server/src/data/Player";
import {useRef, useState} from "react";

const clamp = t => Math.max(0, Math.min(1, t))
const lerp = (a, b, t) => a + (b-a) * t;

const Pl = (props) => {

    const p = props.p;
    const ref = useRef();

    const [playerState, setPlayerState] = useState(p)

    useFrame((c:CanvasContext) => {
        let o = ref.current;
        if (!o) return;
        let dt = clamp((Date.now() - playerState.t)/150);
        o.position.x = lerp(playerState.x0, playerState.x1, dt)
        o.position.y = 2-dt*dt
        o.position.z = lerp(playerState.y0, playerState.y1, dt)
    });

    useServerEvent(ServerEvent.PLAYER_MOVED, (player: Player) => {
        if (player.id !== p.id)
            return
        player.t = Date.now();
        setPlayerState(player)
    })

    return <group ref={ref} >
        <Cube col={'white'}/>
    </group>;
}


export const Players = (props) => {
    console.log(props.players)
    return <>
        {props.players.map(p => <Pl  key={p.id} p={p}/>)}
    </>;
};

