import { memo } from "react";
import Square from "../Square";
import styles from './Screen.module.css';

const Screen = ({ screen, fieldSize }) => {
    return (
        <div className={styles.screen}>
            <div className={styles.screenFrame}>
                {[...Array(fieldSize.y)].map((row, rowIdY) => (
                    <div key={rowIdY} className={styles.rowLine}>
                        {
                            [...Array(fieldSize.x)].map((rowItem, rowIdX) => {
                                const currentSquareIndex = fieldSize.x * rowIdY + rowIdX;
                                return (
                                    <Square key={`${rowIdX}_${rowIdY}`} isFilled={screen[currentSquareIndex].isFilled} />
                                )
                            })
                        }
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default memo(Screen);
