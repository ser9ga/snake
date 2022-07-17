import {useEffect, useRef} from "react";
import {ActionTypes} from "../dictionaries";

export const useMetronome = (snakeState, dispatchSnakeState) => {
    const intervalRef = useRef();

    useEffect(() => {
        if (snakeState.isGameRunning) {
            intervalRef.current = setInterval(
                () => dispatchSnakeState({ type: ActionTypes.prepareAndExecNewTurn }),
                150
            );
        }

        if (!snakeState.isGameRunning) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [snakeState.isGameRunning]);
}