import { FC, memo } from "react";
import styles from './style.module.css';
import RowLine from "./components/RowLine";
import {TFieldSize, TSnakeBody} from "../../common/Types/TSnakeState";

type TScreen = {
    screen: TSnakeBody[];
    fieldSize: TFieldSize
}

const Screen: FC<TScreen> = ({ screen, fieldSize }) => {
    return (
        <div className={styles.screen}>
            <div className={styles.screenFrame}>
                {[...Array(fieldSize.y)].map((row, rowIdY) => (
                    <RowLine
                        {...{
                            key: rowIdY,
                            rowIdY,
                            fieldSize,
                            screen
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default memo(Screen);
