import {AnimationType} from "../../data/AnimationType";
import {Player} from "../../data/Player";
import {ActionType} from "../../dist/src/data/ActionType";


export class DialogCloudState {

    constructor(
        readonly action: ActionType,
        readonly player: Player
    ) {}

}