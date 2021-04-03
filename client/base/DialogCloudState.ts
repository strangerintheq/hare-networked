import {AnimationType} from "../../src/data/AnimationType";
import {Player} from "../../src/data/Player";
import {ActionType} from "../../dist/src/data/ActionType";


export class DialogCloudState {

    constructor(
        readonly action: ActionType,
        readonly player: Player
    ) {}

}