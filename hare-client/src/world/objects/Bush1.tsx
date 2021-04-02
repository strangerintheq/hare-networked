import React from 'react';
import {Cube} from "../Cube";
import {green2} from "../Palette";

export const Bush1 = () => {
    return <group position={[0,1,0]}>
        <Cube col={green2} scale={[0.9,1.2,0.9]}/>
    </group>
}