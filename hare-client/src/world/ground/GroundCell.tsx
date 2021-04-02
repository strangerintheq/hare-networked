import {Cell} from "../../../../hare-server/src/data/Cell";
import React from 'react';
import {CellType} from "../../../../hare-server/src/data/CellType";
import {Ocean} from "./Ocean";
import {Water} from "./Water";
import {Grass} from "./Grass";
import {Sand} from "./Sand";

type CellBaseParams = {
    cell: Cell
};

export const GroundCell = (props: CellBaseParams) => {
    let t = props.cell.type;
    if (t === CellType.OCEAN)
        return <Ocean />
    if (t === CellType.WATER)
        return <Water />
    if (t === CellType.COAST)
        return <Sand />
    return <Grass />
};
