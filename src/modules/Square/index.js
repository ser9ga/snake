import { memo } from "react";
import styles from './style.module.css';

const Square = ({ isFilled }) => {
    return (
        <div className={styles.squareWrapper}>
            <div className={`${styles.square} ${isFilled && styles.filledSquare}`} >
                <div className={`${styles.innerSquare} ${isFilled && styles.filledInnerSquare}`} />
            </div>
        </div>
    )
};

export default memo(Square);
