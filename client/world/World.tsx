import React from 'react';
import {Cell} from "../../src/data/Cell";
import {GroundCell} from "./ground/GroundCell";
import {CellObject} from "./objects/CellObject";

type GroundParams = {
    cells: Cell[],
    onClick: any
};

export const World = (props:GroundParams) => {
    return <>
        <group onClick={props.onClick}>
            {props.cells.map(c =><GroundCell cell={c} key={c.getId()} />)}
        </group>
        <group>
            {props.cells.map(c => <CellObject cell={c} key={c.getId()} />)}
        </group>
    </>;
};