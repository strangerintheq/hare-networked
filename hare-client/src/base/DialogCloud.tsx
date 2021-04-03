import * as React from "react";
import {Cube} from "../world/Cube";
import {white} from "./Palette";
import {useRef} from "react";
import {useFrame} from "react-three-fiber";
import {DialogCloudState} from "./DialogCloudState";

type DialogCloudParams = {
    params: DialogCloudState
};

export const DialogCloud = (props: DialogCloudParams) => {

    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();

    useFrame((c) => {
        if (!ref3.current)
            return

        const dt = c.clock.elapsedTime
        let t1 = Math.min(dt*10,1);

        let y1 = Math.sin(dt*1.3)*0.1;
        ref1.current.position.set(0,y1*t1,0)

        let y2 = Math.sin(dt*1.2)*0.1+0.3;
        ref2.current.position.set(0,y2*t1,0);

        let y3 = Math.sin(dt*1.1)*0.1+1.2;
        let x3 = Math.sin(dt*0.8)*0.05+0.3;

        ref3.current.position.set(x3,y3*t1,0)
        ref3.current.rotation.set(0,Math.sin(dt*0.8)*0.1,0)
        ref3.current.scale.set(1.5*t1, 1.3*t1,0.05);

    })


    if (!props.params)
        return  <></>

    let p = props.params.player;
    return <group position={[p.x1,2.5,p.y1]} rotation={[0,0.5, 0]}>
        <Cube ref={ref1} col={white} scale={[0.1,0.1,0.05]}/>
        <Cube ref={ref2} col={white} scale={[0.3,0.3,0.05]}/>
        <Cube ref={ref3} col={white} scale={[2,2,0.05]}/>

    </group>;
};