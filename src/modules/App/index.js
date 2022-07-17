import Screen from "../Screen";
import { useLogic } from "../../common/Hooks/useLogic";
import { useGameControl } from "../../common/Hooks/useGameControl";
import {useMetronome} from "../../common/Hooks/useMetronome";
import Arrows from "../Arrows";
import ActionButtons from "../ActionButtons";
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
        <div className={styles.container}>
            <div className={styles.screenWrap}>
                <Screen
                    screen={snakeState.screen}
                    fieldSize={fieldSize}
                />
            </div>
            <div className={styles.actionButtonsWrapper}>
                <ActionButtons
                    {...{
                        startOrPauseGame,
                        snakeState,
                        resetGame
                    }}
                />
            </div>
            <Arrows
                dispatchSnakeState={dispatchSnakeState}
            />
        </div>
    );
}

export default App;
