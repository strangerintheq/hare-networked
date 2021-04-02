import React from 'react';
import {Cube} from "../Cube";
import {green2, orange} from "../../base/Palette";

export const Carrot = () => {
    return <group position={[0,0.5, 0]}>
        <Cube col={orange} scale={[0.3, 0.2, 0.3]}/>
        <Cube col={green2} scale={[0.1, 1, 0.1]}/>
    </group>
}