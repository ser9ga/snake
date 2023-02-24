import { FC } from "react";
import Square from "../Square";
import styles from './style.module.css';
import {TFieldSize, TSnakeBody} from "../../../../common/Types/TSnakeState";

type TRowLine = {
    rowIdY: number,
    fieldSize: TFieldSize,
    screen: TSnakeBody[]
}
const RowLine: FC<TRowLine> = ({
    rowIdY,
    fieldSize,
    screen
}) => {
    return (
        <div key={rowIdY} className={styles.rowLine}>
        {[...Array(fieldSize.x)].map((rowItem, rowIdX) => {
            const currentSquareIndex = fieldSize.x * rowIdY + rowIdX;

            return (
                <Square
                    key={`${rowIdX}_${rowIdY}`}
                    isFilled={screen[currentSquareIndex].isFilled}
                />
            )
        })}
    </div>
    )
}

export default RowLine;
