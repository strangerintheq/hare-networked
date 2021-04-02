import * as React from "react";
import {CanvasContext, useFrame} from "react-three-fiber";
import {useServerEvent} from "./Socket";
import {ServerEvent} from "../../hare-server/src/data/ServerEvent";
import {Player} from "../../hare-server/src/data/Player";
import {useRef, useState} from "react";
import {Hare} from "./world/animals/Hare";
import {angleLerp, clamp, lerp} from "./Math";

export const PlayerObj = (props) => {

    const p = props.p;
    const ref = useRef();
    const [playerState, setPlayerState] = useState<Player>(p);

    useFrame((c:CanvasContext) => {
        let o = ref.current;
        if (!o) return;
        let dt = clamp((Date.now() - playerState.t)/200);
        o.position.x = lerp(playerState.x0, playerState.x1, dt);
        o.position.y = lerp(playerState.h0, playerState.h1, dt) + 2 - Math.pow(dt*2 - 1,2);
        o.position.z = lerp(playerState.y0, playerState.y1, dt);
        const ry = angleLerp(playerState.a0, playerState.a1, dt)
        o.rotation.set(0,ry,0)
    });

    useServerEvent(ServerEvent.PLAYER_MOVED, (player: Player) => {
        if (player.id !== p.id)
            return
        player.t = Date.now();
        setPlayerState(player);
    });

    return <group ref={ref}>
        <Hare />
    </group>;
}
