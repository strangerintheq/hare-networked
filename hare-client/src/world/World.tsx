import React from 'react';
import {Cell} from "../../../hare-server/src/data/Cell";
import {GroundCell} from "./GroundCell";
import {CellObject} from "./CellObject";

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