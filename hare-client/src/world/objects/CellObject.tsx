import React from 'react';

import {Cell} from "../../../../hare-server/src/data/Cell";
import {CellObjectType} from "../../../../hare-server/dist/data/CellObjectType";
import {Carrot} from "./Carrot";
import {Bush1} from "./Bush1";
import {Bush2} from "./Bush2";
import {Tree2} from "./Tree2";
import {Tree1} from "./Tree1";

type CellObjectParams = {
    cell: Cell,
    key: any
};

export const CellObject = (props:CellObjectParams) => {
    const c = props.cell;
    return <group position={[c.x, c.height, c.y]}>
        {getCellObject(c.object)}
    </group>;
};

function getCellObject(type: CellObjectType){
    if (type === CellObjectType.CARROT)
        return <Carrot />
    if (type === CellObjectType.BUSH1)
        return <Bush1 />
    if (type === CellObjectType.BUSH2)
        return <Bush2 />
    if (type === CellObjectType.TREE1)
        return <Tree1 />
    if (type === CellObjectType.TREE2)
        return <Tree2 />
    return <></>
}