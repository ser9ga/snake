import { memo } from "react";
import styles from './Screen.module.css';

const Screen = ({ presentScreenState }) => {


    const square = (isFilled, rowItemIdx) => (
        <div key={rowItemIdx} className={styles.squareWrapper}>
            <div className={`${styles.square} ${isFilled && styles.filledSquare}`} >
                <div className={`${styles.innerSquare} ${isFilled && styles.filledInnerSquare}`} />
            </div>
        </div>
    );

    return (
        <div className={styles.screen}>
            {
                presentScreenState.map((row, rowIdx) =>
                    <div key={rowIdx} className={styles.rowLine}>
                        {
                            row.map((rowItem, rowItemIdx) => {
                                    return (
                                        square(rowItem.isFilled, rowItemIdx)
                                    )
                                }
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default memo(Screen);
