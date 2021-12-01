import styles from './App.module.css';
import Screen from "./Screen";
import GameControl from "./GameControl";
import useLogic from "./Hooks/useLogic";

const App = () => {
    const {
        fieldSize,
        snakeState,
        startOrPauseGame,
        resetGame,
        keyPressHandler
    } = useLogic();

    return (
        <div className={styles.App}>
            <Screen screen={snakeState.screen} fieldSize={fieldSize} />
            <div className={styles.buttonPanel}>
                <button className={styles.button} onClick={startOrPauseGame}>{snakeState.isGameRunning || snakeState.restartFlag ? 'Pause' : 'Start'}</button>
                <button className={styles.button} onClick={resetGame}>Reset</button>
            </div>
            <GameControl keyPressHandler={keyPressHandler} />
        </div>
    );
}

export default App;
