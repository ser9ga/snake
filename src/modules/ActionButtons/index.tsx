import {FC} from "react";
import {TSnakeState} from "../../common/Types/TSnakeState";
import styles from "./style.module.css";

export type TActionButtons = {
    startOrPauseGame: () => void,
    snakeState: TSnakeState,
    resetGame: () => void,
};

const ActionButtons: FC<TActionButtons> = ({startOrPauseGame, snakeState, resetGame}) => {
    return (
        <div className={styles.buttonPanel}>
            <button
                className={styles.button}
                onClick={startOrPauseGame}
            >
                {snakeState.isGameRunning || snakeState.restartFlag ? 'Pause' : 'Start'}
            </button>
            <button
                className={styles.button}
                onClick={resetGame}
            >
                Reset
            </button>
        </div>
    );
};

export default ActionButtons
