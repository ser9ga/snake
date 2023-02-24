import { FC, memo } from "react";
import { clsx } from 'clsx';
import styles from './style.module.css';

type  TSquare = { isFilled: boolean }

const Square: FC<TSquare> = ({ isFilled }) => {
    return (
        <div className={styles.squareWrapper}>
            <div className={clsx(styles.square, isFilled && styles.filledSquare)} >
                <div className={clsx(styles.innerSquare, isFilled && styles.filledInnerSquare)}/>
            </div>
        </div>
    )
};

export default memo(Square);
