import React from 'react';
import {Cube} from "../Cube";
import {brown1, green} from "../../base/Palette";

export const Grass = () => {
    return <>

        <Cube col={green}
              size={[1,0.1,1]}
              position={[0,0.4,0]}
              noCastShadow={true}/>

        <Cube col={brown1}
              size={[1,0.9,1]}
              position={[0,-0.1,0]}
              noCastShadow={true}/>

    </>
}