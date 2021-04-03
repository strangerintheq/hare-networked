import * as React from "react";
import {useRef} from "react";
import {CanvasContext, useFrame} from "react-three-fiber";

export const Atmosphere = () => {

    const ref1 = useRef();
    const ref2 = useRef();

    useFrame((c: CanvasContext) => {
        let t1 = .9;//c.clock.elapsedTime / 1000 + 1
        let t2 = t1 + Math.PI;
        ref1.current.position.set(0, Math.cos(t1) * 6, Math.sin(t1) *6)
        ref2.current.position.set(0, Math.cos(t2) * 6, Math.sin(t2) * 6)
    })

    return <>
        <directionalLight
            ref={ref1}
            castShadow
            shadow-mapSize-height={2048}
            shadow-mapSize-width={2048}
            shadow-camera-left={-11}
            shadow-camera-right={11}
            shadow-camera-top={11}
            shadow-camera-bottom={-11}
            intensity={0.4}/>

        <directionalLight
            ref={ref2}
            castShadow
            shadow-mapSize-height={2048}
            shadow-mapSize-width={2048}
            shadow-camera-left={-11}
            shadow-camera-right={11}
            shadow-camera-top={11}
            shadow-camera-bottom={-11}
            intensity={0.05}/>

        <ambientLight
            intensity={0.05}/>
    </>;
};