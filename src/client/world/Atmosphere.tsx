import * as React from "react";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {RootState} from "@react-three/fiber/dist/declarations/src/core/store";


export const Atmosphere = () => {

    const ref1 = useRef();
    const ref2 = useRef();

    useFrame((c:RootState) => {
        let t1 = 1;//c.clock.elapsedTime / 100 + 1
        let t2 = t1 + Math.PI;
        let cs1 = Math.cos(t1);
        let cs2 = Math.cos(t2);
        ref1.current.position.set(cs1 * 10, cs1 * 26, Math.sin(t1) * 26)
        ref2.current.position.set(cs2 * 10, cs2 * 26, Math.sin(t2) * 26)
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
            intensity={0.6}/>

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