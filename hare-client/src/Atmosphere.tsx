import * as React from "react";
import {CanvasContext, useFrame} from "react-three-fiber";
import {useRef} from "react";
import {Cube} from "./world/Cube";

export const Atmosphere = () => {

    const ref = useRef();

    useFrame((c: CanvasContext) => {
        let t = 1;//c.clock.elapsedTime/100+1
        ref.current.position.set(0, Math.cos(t)*12, Math.sin(t)*12)
    })

    const position = [0,10,10]

    return <>
        <group position={position} ref={ref}>
            <directionalLight
                castShadow
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
                intensity={0.55} />
            {/*<Cube col={'yellow'} noShadow/>*/}
        </group>

        <ambientLight intensity={0.05}/>


    </>;
};