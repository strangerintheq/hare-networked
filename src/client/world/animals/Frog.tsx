import React from 'react';
import {Cube} from "../Cube";
import {brown1, green4, orange} from "../../base/Palette";

export const Frog = () => {
    return <>

        {/*torso*/}
        <Cube col={green4} scale={[0.55, 0.2, 0.55]} position={[0,-0.3,0.1]}/>

        {/* back legs*/}
        <Cube col={green4} scale={[0.3, 0.2, 0.4]} position={[-0.2,-0.5,-0.1]}/>
        <Cube col={green4} scale={[0.3, 0.2, 0.4]} position={[0.2,-0.5,-0.1]}/>

        {/* back legs*/}
        <Cube col={green4} scale={[0.2, 0.1, 0.2]} position={[-0.15,-0.5,0.3]}/>
        <Cube col={green4} scale={[0.2, 0.1, 0.2]} position={[0.15,-0.5,0.3]}/>

        {/* eyes*/}
        <Cube col={green4} scale={[0.2, 0.5, 0.1]} position={[-0.15,-0.3,0.25]}/>
        <Cube col={green4} scale={[0.2, 0.5, 0.1]} position={[0.15,-0.3,0.25]}/>

        {/* eye center */}
        <Cube col={orange} scale={[0.1, 0.1, 0.1]} position={[-0.15,-0.15,0.3]}/>
        <Cube col={orange} scale={[0.1, 0.1, 0.1]} position={[0.15,-0.15,0.3]}/>
        {/*<Cube col={green4} scale={[0.6, 0.4, 0.8]} position={[0,0.4,0.1]}/>*/}
    </>
}