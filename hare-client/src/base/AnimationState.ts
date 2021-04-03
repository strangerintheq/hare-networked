import {AnimationType} from "../../../hare-server/src/data/AnimationType";
import {Player} from "../../../hare-server/src/data/Player";

export class AnimationState {
    id = 'a_'+Math.random().toString(36).substring(2)
    constructor(
        readonly type: AnimationType,
        readonly player: Player
    ) {}

}