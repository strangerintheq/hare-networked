import React from 'react';
import {yellow} from "../Palette";
import {Cube} from "../Cube";


export const Sand = () => {
    return <>
        <Cube col={yellow} noCastShadow={true} />
    </>
}