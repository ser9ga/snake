import {Dispatch, useEffect, useRef} from "react";
import { ActionTypes } from "../dictionaries/ActionTypes";
import {TAction, TSnakeState} from "../Types/TSnakeState";

export const useMetronome = (snakeState: TSnakeState, dispatchSnakeState: Dispatch<TAction>) => {
    const intervalRef = useRef<number | undefined>();

    useEffect(() => {
        if (snakeState.isGameRunning) {
            intervalRef.current = setInterval(
                () => dispatchSnakeState({type: ActionTypes.prepareAndExecNewTurn}),
                150
            );
        }

        if (!snakeState.isGameRunning) {
            clearInterval(intervalRef.current);
        }
    }, [snakeState.isGameRunning]);
};

