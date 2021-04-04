import React from 'react';
import {Cube} from "../Cube";
import {blue2} from "../../base/Palette";


export const Ocean = () => {
    return <>
        <Cube col={blue2}  scale={[1,0.8,1]} position={[0,-0.2,0]}/>
    </>
}