import * as React from "react";
import {useRef} from "react";

import {Cube} from "../Cube";

import { blue11} from "../../base/Palette";
import {clamp, now, oneMinusParabola} from "../../base/Math";
import {AnimationType} from "../../../data/AnimationType";
import {Player} from "../../../data/Player";
import {useFrame} from "@react-three/fiber";
import {RootState} from "@react-three/fiber/dist/declarations/src/core/store";

export const WaterSplashAnimation = (props:{player:Player}) => {

    const ref = useRef();

    useFrame((c:RootState) => {
        let o = ref.current;
        if (!o) return;
        if (props.player.animation === AnimationType.WATER_SPLASH) {
            let dt = clamp((now()-props.player.t-75)/500);
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