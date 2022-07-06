import {useEffect, useRef} from "react";
import {TypeEnum} from "../dictionaries/TypeEnum";

export const useMetronome = (snakeState, dispatchSnakeState) => {
    const intervalRef = useRef();

    useEffect(() => {
        if (snakeState.isGameRunning) {
            intervalRef.current = setInterval(
                () => dispatchSnakeState({ type: TypeEnum.prepareAndExecNewTurn }),
                200
            );
        }

        if (!snakeState.isGameRunning) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [snakeState.isGameRunning]);
}