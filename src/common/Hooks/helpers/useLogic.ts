import {TSnakeBody, TSnakeState} from "../../Types/TSnakeState";

export const getSnakeParams = (state: TSnakeState) => {
    let copiedState = {...state};
    const filteredBodyState = copiedState.body

    const cutTail = !filteredBodyState[0]['isFilled'] && filteredBodyState.shift();

    filteredBodyState[0]['isFilled'] = true;

    const direction = copiedState.currentDirection.ax === copiedState.nextDirection.ax
        ? 'currentDirection'
        : 'nextDirection';

    const newCurrentDirection = state[direction]

    const cd = copiedState[direction].ax === 'horizontal' ? 'x' : 'y';
    const currenHead = {...filteredBodyState[filteredBodyState.length - 1]};
    const getNextBodyPixel = (prev: TSnakeBody) => ({
        ...prev,
        [cd]: state[direction].dir === 'forward' ? prev[cd] + 1 : prev[cd] - 1,
        isTarget: false
    })
    const newHead = getNextBodyPixel(currenHead);

    return {
        filteredBodyState,
        newCurrentDirection,
        currenHead,
        cutTail,
        getNextBodyPixel,
        newHead
    }
}
