import React from 'react';
import {Cube} from "../Cube";
import {brown1, green, green2} from "../../base/Palette";

export const Tree1 = () => {
    let p = [0,2,0];
    return <group position={[0,1,0]}>
        <Cube col={brown1} scale={[0.3, 2, 0.3]} />
        <Cube col={green} scale={[1.5, 2, 1.5]} position={p} />
        <Cube col={green2} scale={[1, 2.5, 1]} position={p} />
        <Cube col={green2} scale={[2, 1.5, 1]} position={p} />
        <Cube col={green2} scale={[1, 1.5, 2]} position={p} />
    </group>
}