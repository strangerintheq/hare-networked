import React from 'react';
import {Cube} from "../Cube";
import {blue1} from "../../base/Palette";

export const Water = () => {
    return <>
        <Cube col={blue1}  scale={[1,0.8,1]} position={[0,-0.2,0]}/>
    </>
}