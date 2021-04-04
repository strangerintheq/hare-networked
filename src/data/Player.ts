import {AnimationType} from "./AnimationType";
import {ActionType} from "./ActionType";
import {AnimalType} from "./AnimalType";

export class Player {
    wsId: string;
    id: string;
    t: number;

    sx: number;
    sy: number;

    x0: number;
    y0: number;
    h0: number;
    a0: number;

    x1: number;
    y1: number;
    h1: number;
    a1: number;

    animation: AnimationType = AnimationType.NONE;
    action: ActionType;
    animal: AnimalType;

    static roomKey(o:any){
        return 'sector_' + o.sx + '_' + o.sy;
    }
}