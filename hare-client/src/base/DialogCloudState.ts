import {AnimationType} from "../../../hare-server/src/data/AnimationType";
import {Player} from "../../../hare-server/src/data/Player";
import {ActionType} from "../../../hare-server/dist/data/ActionType";

export class DialogCloudState {

    constructor(
        readonly action: ActionType,
        readonly player: Player
    ) {}

}