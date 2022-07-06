import Screen from "../Screen";
import { useLogic } from "../../common/Hooks/useLogic";
import { useGameControl } from "../../common/Hooks/useGameControl";
import {useMetronome} from "../../common/Hooks/useMetronome";
import styles from './style.module.css';

const App = () => {
    const {
        fieldSize,
        snakeState,
        dispatchSnakeState,
        startOrPauseGame,
        resetGame,
        keyPressHandler
    } = useLogic();

    useGameControl(keyPressHandler)
    useMetronome(snakeState, dispatchSnakeState)

    return (
        <div className={styles.App}>
            <Screen
                screen={snakeState.screen}
                fieldSize={fieldSize}
            />
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
        </div>
    );
}

export default App;
