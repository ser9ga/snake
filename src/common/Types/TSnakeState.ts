import {ActionTypes} from "../dictionaries/ActionTypes";

export type TCurrentDirection = {
    dir: 'forward' | 'backward',
    ax: 'horizontal' | 'vertical'
}

export type TSnakeBody = {
    x: number,
    y: number,
    isFilled: boolean,
    isTarget: boolean
}

export type TSnakeState = {
    restartFlag: boolean,
    isGameRunning: boolean,
    isMatchIsOn: boolean,
    isGameOver: boolean,
    body: TSnakeBody[],
    screen: TSnakeBody[],
    currentDirection: TCurrentDirection,
    nextDirection: TCurrentDirection
}

export type TAction = {
    type: ActionTypes;
    payload?: TCurrentDirection;
};

export type TFieldSize = {
    x: number,
    y:number
}
