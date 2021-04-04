import React from 'react';
import {Cube} from "../Cube";
import {brown1, green4} from "../../base/Palette";

export const Frog = () => {
    return <>

        <Cube col={green4} scale={[0.6, 0.2, 0.6]} position={[0,-0.3,0.1]}/>
        <Cube col={green4} scale={[0.8, 0.2, 0.4]} position={[0,-0.5,-0.1]}/>

        <Cube col={green4} scale={[0.2, 0.5, 0.1]} position={[-0.15,-0.3,0.15]}/>
        <Cube col={green4} scale={[0.2, 0.5, 0.1]} position={[0.15,-0.3,0.15]}/>

        <Cube col={brown1} scale={[0.1, 0.1, 0.1]} position={[-0.15,-0.2,0.2]}/>
        <Cube col={brown1} scale={[0.1, 0.1, 0.1]} position={[0.15,-0.2,0.2]}/>
        {/*<Cube col={green4} scale={[0.6, 0.4, 0.8]} position={[0,0.4,0.1]}/>*/}
    </>
}