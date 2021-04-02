import React from 'react';
import {Cube} from "./Cube";

export const Hare = () => {
    return <>
        {/* body */}
        <Cube col={'white'} scale={[0.8, 0.8, 0.8]} />
        {/* legs */}
        <Cube col={'white'} scale={[0.7, 0.7, 0.7]} position={[0,-0.2, 0]} />
        {/* ears */}
        <Cube col={'white'} scale={[0.2, 0.6, 0.05]} position={[0.15, 0.6, -0.3]} />
        <Cube col={'white'} scale={[0.2, 0.6, 0.05]} position={[-0.15, 0.6, -0.3]} />
        {/* tail */}
        <Cube col={'white'} scale={[0.1, 0.1, 0.1]} position={[0, -0.2, -0.45]} />
        {/* mouth */}
        <Cube col={'red'} scale={[0.3, 0.1, 0.1]} position={[0, -0.1, 0.45]} />
    </>
}