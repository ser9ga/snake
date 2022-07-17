import {ActionTypes, DirectionTypes} from "../../common/dictionaries";
import styles from "./style.module.css";

const Arrows = ({dispatchSnakeState}) => {
    const controlHandler = directionParams => dispatchSnakeState({
        type: ActionTypes.controlEventHandler,
        payload: directionParams
    });

    return (
        <div
            className={styles.container}
        >
            <div
                className={`${styles.upButtonContainer} ${styles.buttonContainer}`}
                onClick={() =>  controlHandler(DirectionTypes.up)}
            >
                <div className={`${styles.squareButton} ${styles.buttonContainer} ${styles.upButton}`}>
                    <div className={styles.triangle} />
                </div>
            </div>
            <div
                className={`${styles.leftButtonContainer} ${styles.buttonContainer}`}
                onClick={() =>  controlHandler(DirectionTypes.left)}

            >
                <div className={`${styles.squareButton} ${styles.buttonContainer} ${styles.leftButton}`}>
                    <div className={styles.triangle} />
                </div>
                </div>
            <div
                className={`${styles.rightButtonContainer} ${styles.buttonContainer}`}
                onClick={() =>  controlHandler(DirectionTypes.right)}

            >
                <div className={`${styles.squareButton} ${styles.buttonContainer} ${styles.rightButton}`}>
                    <div className={styles.triangle} />

                </div>
            </div>
            <div
                className={`${styles.downButtonContainer} ${styles.buttonContainer}`}
                onClick={() =>  controlHandler(DirectionTypes.down)}
            >
                <div className={`${styles.squareButton} ${styles.buttonContainer} ${styles.downButton}`}>
                    <div className={styles.triangle} />
                </div>
            </div>
        </div>
    )
}

export default Arrows