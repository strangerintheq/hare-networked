import * as React from "react";
import {AnimationState} from "../../base/AnimationState";
import {AnimationType} from "../../../../hare-server/dist/data/AnimationType";
import {WaterSplashAnimation} from "./WaterSplashAnimation";

type AnimParams = {
    animation: AnimationState,
    key
};

export const Anim = (props:AnimParams) => {

    if (props.animation.type === AnimationType.WATER_SPLASH)
        return <WaterSplashAnimation player={props.animation.player} />

    return <></>;
};