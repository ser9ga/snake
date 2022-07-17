import styles from "./style.module.css";

const ActionButtons = ({startOrPauseGame, snakeState, resetGame}) => {
    return <div className={styles.buttonPanel}>
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
    </div>;
}

export default ActionButtons