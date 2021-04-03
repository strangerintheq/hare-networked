import {AnimationType} from "../../src/data/AnimationType";
import {Player} from "../../src/data/Player";

export class AnimationState {
    // @ts-ignore
    id = 'a_'+ Math.random().toString(36).substring(2)
    constructor(
        readonly type: AnimationType,
        readonly player: Player
    ) {}

}