import {AnimationType} from "./AnimationType";
import {ActionType} from "./ActionType";

export class Player {
    wsId: string;
    id: string;
    t: number;

    x0: number;
    h0: number;
    y0: number;
    a0: number;

    x1: number;
    h1: number;
    y1: number;
    a1: number;

    animation: AnimationType = AnimationType.NONE;
    action: ActionType;
}