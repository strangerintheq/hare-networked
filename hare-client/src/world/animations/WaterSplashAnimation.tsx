import * as React from "react";
import {useRef} from "react";
import {Player} from "../../../../hare-server/dist/data/Player";
import {CanvasContext, useFrame} from "react-three-fiber";
import {Cube} from "../Cube";

import { blue11} from "../../base/Palette";
import {clamp, oneMinusParabola, pow} from "../../base/Math";
import {AnimationType} from "../../../../hare-server/src/data/AnimationType";

export const WaterSplashAnimation = (props:{player:Player}) => {

    const ref = useRef();

    useFrame((c:CanvasContext) => {
        let o = ref.current;
        if (!o) return;
        if (props.player.animation === AnimationType.WATER_SPLASH) {
            let dt = clamp((Date.now()-props.player.t-75)/500);
            let f = oneMinusParabola(dt*2 - 1)
            let c = dt*3;
            ref.current.scale.set(c, 0.1, c);
            ref.current.position.y =  + f*0.2
        } else {
            ref.current.scale.setScalar(0);
        }
    });

    return <Cube ref={ref}
                 col={blue11}
                 scale={[0,0,0]}
                 position={[props.player.x1,0.1,props.player.y1]}/>;
};