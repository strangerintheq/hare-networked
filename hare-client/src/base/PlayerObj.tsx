import * as React from "react";
import {useRef} from "react";
import {CanvasContext, useFrame} from "react-three-fiber";
import {Hare} from "../world/animals/Hare";
import {angleLerp, clamp, lerp} from "./Math";

export const PlayerObj = (props) => {

    const p = props.p;
    const ref = useRef();

    useFrame((c:CanvasContext) => {
        let o = ref.current;
        if (!o) return;
        let dt = clamp((Date.now() - p.t)/200);
        o.position.x = lerp(p.x0, p.x1, dt);
        o.position.y = lerp(p.h0, p.h1, dt) + 2 - Math.pow(dt*2 - 1,2);
        o.position.z = lerp(p.y0, p.y1, dt);
        const ry = angleLerp(p.a0, p.a1, dt)
        o.rotation.set(0,ry,0);
    });

    return <group ref={ref}>
        <Hare />
        {/*<WaterSplashAnimation player={p}/>*/}
    </group>;
}
