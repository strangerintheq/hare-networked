import * as React from "react";
import {CanvasContext, useFrame} from "react-three-fiber";
import {useRef} from "react";

export const Atmosphere = () => {

    const ref = useRef();

    // useFrame((c: CanvasContext) => {
    //     let t = 1;//c.clock.elapsedTime/100+1
    //     ref.current.position.set(0, Math.cos(t)*12, Math.sin(t)*12)
    // })



    return <>

        <directionalLight position={[0,10,10]} ref={ref}
            castShadow
            shadow-mapSize-height={1024}
            shadow-mapSize-width={1024}
          shadow-camera-left={-11}
          shadow-camera-right={11}
          shadow-camera-top={11}
          shadow-camera-bottom={-11}
            intensity={0.4} />

        <directionalLight position={[10,10,0]} ref={ref}


                          intensity={0.05} />


        <ambientLight intensity={0.05}/>


    </>;
};