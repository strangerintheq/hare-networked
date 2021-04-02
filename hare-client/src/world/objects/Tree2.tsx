import React from 'react';
import {Cube} from "../Cube";
import {brown1, green3} from "../../base/Palette";

export const Tree2 = () => {

    return <group position={[0,1,0]}>
        <Cube col={brown1} scale={[0.3, 2.0, 0.3]} />
        <Cube col={brown1} scale={[2.0, 0.3, 0.3]} position={[0.65, 1.5, 0]} rotation={[0, 0, 0.7]} />
        <Cube col={brown1} scale={[2.0, 0.3, 0.3]} position={[-0.65, 1.5, 0]} rotation={[0, 0, -0.7]} />
        <Cube col={green3} scale={[1.5, 0.7, 1]} position={[1.5, 2, 0]} />
        <Cube col={green3} scale={[1.0, 0.7, 0.8]} position={[1.7, 2.5, 0]} />
        <Cube col={green3} position={[-1, 2, 0]} />
    </group>
}