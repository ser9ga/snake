import styles from './App.module.css';
import Screen from "./Screen";
import { useState } from "react";
import GameControl from "./GameControl";

function App() {
    // const [isGameRunning, setIsGameRunning] = useState(false)

    let isGameRunning = false;
    const fieldSize = [50, 35];

    const initArr = (x, y) => {
        return [...Array(x)].map((_, i) => [...Array(y)].map((_, j) =>
            ({ x: i, y: j, isFilled: ( i === 0 || i === x - 1 || j === 0 || j === y - 1 ) })));
    };

    const [presentScreenState, setPresentScreenState] = useState(initArr(...fieldSize))

    const applyChangesToScreen = changes => {
        setPresentScreenState(previousArrState => previousArrState
            .map(row => row.map(rowItem => changes.map(change => (change.x === rowItem.x && change.y ===rowItem.y) ?
                { ...rowItem, isFilled: change.isFilled } :
                rowItem
            )))
        )
    };

    const getNextDirection = () => {

    }
    const nextAction = () => {
        setTimeout(() => {
            applyChangesToScreen([{x:5, y: 5, isFilled:true }])
            console.log('wow!')
        }, 500)

        isGameRunning && nextAction()
    };

    const startGame = () => {
        // setIsGameRunning(true)
        isGameRunning = true
        nextAction()

    }

    const stopGame = () => {
        // setIsGameRunning(false);
        isGameRunning = false;
        // setPresentScreenState(initArr(...fieldSize))
    }

    return (
        <div className={styles.App}>
            <Screen
                presentScreenState={presentScreenState}
            />
            <div className={styles.buttonPanel}>
                <button className={styles.button} onClick={startGame}>Start</button>
                <button className={styles.button} onClick={stopGame}>Stop</button>
            </div>
            <GameControl getNextDirection={getNextDirection} />
        </div>
    );
}

export default App;
