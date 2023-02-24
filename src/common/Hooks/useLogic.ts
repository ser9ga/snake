import {useMemo, useReducer} from "react";
import {DirectionTypes} from "../dictionaries/DirectionTypes";
import {ActionTypes} from "../dictionaries/ActionTypes";
import {TAction, TCurrentDirection, TFieldSize, TSnakeBody, TSnakeState} from "../Types/TSnakeState";
import {getSnakeParams} from "./helpers/useLogic";

export const useLogic = () => {
    const fieldSize: TFieldSize = useMemo(() => ({x: 26, y: 18}), []);

    const initSnakeBody = [...Array(4)]
        .map((_, index) => ({
            x: index + 4,
            y: 5,
            isFilled: !!index,
            isTarget: false
        }));

    const generateInitField: TSnakeBody[] = useMemo(() => {
        return [...Array(fieldSize.y)]
            .flatMap((_, j) => [...Array(fieldSize.x)]
                .map((_, i) =>
                    ({
                        x: i,
                        y: j,
                        isFilled: false,
                        isTarget: false
                    })))
    }, [fieldSize]);

    const initFieldChanges: TSnakeBody[] = useMemo(() => {
        return generateInitField.reduce((acc: TSnakeBody[], el: TSnakeBody) => {
            if (el.x === 0 || el.x === fieldSize.x - 1 || el.y === 0 || el.y === fieldSize.y - 1) {
                return acc.concat({...el, isFilled: true});
            }

            return acc;
        }, [])
    }, [fieldSize]);


    const prepareNewScreenState = (screenState: TSnakeBody[], changes: TSnakeBody[]): TSnakeBody[] => {
        let newScreenState: TSnakeBody[] = [...screenState];
        changes.forEach(change => newScreenState[fieldSize.x * change.y + change.x] = change);

        return newScreenState;
    };

    const initSnakeState: TSnakeState = {
        restartFlag: false,
        isGameRunning: false,
        isMatchIsOn: false,
        isGameOver: false,
        body: [...initSnakeBody],
        screen: prepareNewScreenState(generateInitField, initFieldChanges),
        currentDirection: {dir: 'forward', ax: 'horizontal'},
        nextDirection: {dir: 'forward', ax: 'horizontal'}
    };

    const getNextTarget = (screen: TSnakeBody[], occupied?: TSnakeBody[]) => {
        let copiedScreen: TSnakeBody[] = [...screen];
        occupied?.forEach(change => {
            copiedScreen.splice(fieldSize.x * change.y + change.x, 1);
        });

        const unfilledScreenPixels = copiedScreen.filter(pix => !pix.isFilled)

        return {
            ...unfilledScreenPixels[Math.floor(Math.random() * unfilledScreenPixels.length)],
            isFilled: true,
            isTarget: true,
        };
    };

    const setTargetPixel = (state: TSnakeState) => {
        const {newHead} = getSnakeParams(state);
        const newTarget = getNextTarget(
            state.screen, [...initSnakeBody, newHead]
        );
        const newScreenState = prepareNewScreenState(state.screen, [newTarget]);

        return {screen: newScreenState};
    };

    const snakeStateReducer = (state: TSnakeState, action: TAction): TSnakeState => {
        if (action.type === ActionTypes.prepareAndExecNewTurn) {
            const {
                filteredBodyState,
                newCurrentDirection,
                cutTail,
                newHead
            } = getSnakeParams(state);

            const nextHeadPlace = {...state.screen[fieldSize.x * newHead.y + newHead.x]};

            if (nextHeadPlace.isFilled && !nextHeadPlace.isTarget) {
                return {
                    ...state,
                    isGameRunning: false,
                    isMatchIsOn: false,
                    isGameOver: true,
                    currentDirection: {dir: 'forward', ax: 'horizontal'},
                    nextDirection: {dir: 'forward', ax: 'horizontal'}
                }
            }

            let newSnakeBodyState = [...filteredBodyState];

            if (nextHeadPlace.isTarget) {
                newSnakeBodyState.splice(1, 0, {...newSnakeBodyState[0], isFilled: false});
            }

            newSnakeBodyState = newSnakeBodyState
                .map((pix, idx) => idx === 0
                    ? {...pix, isFilled: false}
                    : pix)
                .concat(newHead);

            let newScreenState = prepareNewScreenState(state.screen, newSnakeBodyState);

            if (nextHeadPlace.isTarget) {
                newScreenState = prepareNewScreenState(
                    newScreenState,
                    [getNextTarget(newScreenState, !!cutTail ? [cutTail] : [])]
                );
            }

            return {
                ...state,
                screen: newScreenState,
                body: newSnakeBodyState,
                currentDirection: newCurrentDirection
            };
        }

        if (action.type === ActionTypes.controlEventHandler) {
            if (action.payload) {
                const directionParams: TCurrentDirection = action.payload;

                if (!(state.nextDirection.dir === directionParams?.dir
                        && state.nextDirection.ax === directionParams?.ax)
                    && directionParams
                    && state.isGameRunning) {
                    return {...state, nextDirection: directionParams}
                }
            }

            return state
        }

        if (action.type === ActionTypes.startOrPause) {
            const {
                isGameRunning,
                isMatchIsOn,
                isGameOver,
                body,
                screen
            } = state;

            const stateWithoutTarget = {
                ...state,
                isGameOver: false,
                isMatchIsOn: true,
                isGameRunning: !isGameRunning,
                screen: !isMatchIsOn ?
                    prepareNewScreenState(generateInitField, [...initFieldChanges, ...initSnakeBody])
                    : screen,
                body: isGameOver ? [...initSnakeState.body] : body,
            }

            return {
                ...stateWithoutTarget,
                ...(!isMatchIsOn && setTargetPixel(stateWithoutTarget))
            }
        }

        if (action.type === ActionTypes.resetHandler) {
            const {restartFlag, isGameRunning, isMatchIsOn, isGameOver} = state;
            const setParams = {
                isGameRunning: !isMatchIsOn && isGameOver ? true : isGameRunning,
                isMatchIsOn: !restartFlag ? isGameOver : true
            };

            const fillScreen = restartFlag || isGameOver ? {
                screen: prepareNewScreenState(generateInitField, [...initFieldChanges, ...initSnakeBody])
            } : {};

            const stateWithoutTarget = {
                ...state,
                ...initSnakeState,
                ...setParams,
                ...fillScreen,
                restartFlag: restartFlag
            };

            return {
                ...stateWithoutTarget,
                ...(((restartFlag && isMatchIsOn) || isGameOver) && setTargetPixel(stateWithoutTarget))
            };
        }

        if (action.type === ActionTypes.stopInterval) {
            return {
                ...state,
                restartFlag: state.isGameRunning || state.isGameOver,
                isGameRunning: false
            }
        }

        if (action.type === ActionTypes.startInterval) {
            return {
                ...state,
                restartFlag: false,
                isGameRunning: state.restartFlag
            }
        }

        return {...state}

    };

    const [snakeState, dispatchSnakeState] = useReducer(snakeStateReducer, initSnakeState);

    const resetGame = () => {
        dispatchSnakeState({
            type: ActionTypes.stopInterval
        });

        dispatchSnakeState({
            type: ActionTypes.resetHandler
        });

        dispatchSnakeState({
            type: ActionTypes.startInterval
        });
    };

    const keyPressHandler: (event: KeyboardEvent) => void = event => {
        // event.preventDefault();

        const directionParams = {
            ArrowLeft: DirectionTypes.left,
            ArrowRight: DirectionTypes.right,
            ArrowUp: DirectionTypes.up,
            ArrowDown: DirectionTypes.down,
            KeyA: DirectionTypes.left,
            KeyD: DirectionTypes.right,
            KeyW: DirectionTypes.up,
            KeyS: DirectionTypes.down,
        }[event.code];

        dispatchSnakeState({
            type: ActionTypes.controlEventHandler,
            payload: directionParams
        });

        if (event.code === 'Space') {
            startOrPauseGame();
        }

        if (event.code === 'Backspace') {
            resetGame();
        }
    };

    const startOrPauseGame = () => {
        dispatchSnakeState({
            type: ActionTypes.startOrPause
        })
    };

    return {
        fieldSize,
        snakeState,
        dispatchSnakeState,
        startOrPauseGame,
        resetGame,
        keyPressHandler
    };
}
