import { useMemo, useReducer } from "react";
import { TypeEnum } from "../dictionaries/TypeEnum";

export const useLogic = () => {
    const fieldSize = useMemo(() => ({x: 20, y: 20}), []);

    const initSnakeBody = [...Array(4)]
        .map((_, index) => ({
            x: index + 4,
            y: 5,
            isFilled: !!index,
            isTarget: false
        }));

    const generateInitField = useMemo(() => {
        return [...Array(fieldSize.y)].flatMap((_, j) => [...Array(fieldSize.x)].map((_, i) =>
            ({
                x: i,
                y: j,
                isFilled: false,
                isTarget: false
            })))
    }, [fieldSize]);

    const initFieldChanges = useMemo(() => {
        return generateInitField.reduce((acc, el) => {
            if (el.x === 0 || el.x === fieldSize.x - 1 || el.y === 0 || el.y === fieldSize.y - 1) {
                return acc.concat({...el, isFilled: true});
            }

            return acc;
        }, [])
    }, [fieldSize]);


    const prepareNewScreenState = (screenState, changes) => {
        let newScreenState = [...screenState];
        changes.forEach(change => newScreenState[fieldSize.x * change.y + change.x] = change);

        return newScreenState;
    };

    const initSnakeState = {
        restartFlag: false,
        isGameRunning: false,
        isMatchIsOn: false,
        isGameOver: false,
        body: [...initSnakeBody],
        screen: prepareNewScreenState(generateInitField, initFieldChanges),
        currentDirection: {dir: 'forward', ax: 'horizontal'},
        nextDirection: {dir: 'forward', ax: 'horizontal'}
    };

    const getSnakeParams = state => {
        let copiedState = {...state};
        const filteredBodyState = copiedState.body
        const cutTail = !filteredBodyState[0]['isFilled'] ? filteredBodyState.shift() : {};
        filteredBodyState[0]['isFilled'] = true;
        const direction = copiedState.currentDirection.ax === copiedState.nextDirection.ax ? 'currentDirection' : 'nextDirection';
        const cd = copiedState[direction].ax === 'horizontal' ? 'x' : 'y';
        const currenHead = {...filteredBodyState[filteredBodyState.length - 1]};
        const getNextBodyPixel = prev => ({
            ...prev,
            [cd]: state[direction].dir === 'forward' ? prev[cd] + 1 : prev[cd] - 1,
            isTarget: false
        })
        const newHead = getNextBodyPixel(currenHead);

        return {
            filteredBodyState,
            direction,
            currenHead,
            cutTail,
            getNextBodyPixel,
            newHead
        }
    };

    const getNextTarget = (screen, occupied) => {
        let copiedScreen = [...screen];
        occupied.forEach(change => {
            copiedScreen.splice([fieldSize.x * change.y + change.x], 1);
        });

        const unfilledScreenPixels = copiedScreen.filter(pix => !pix.isFilled)

        return {
            ...unfilledScreenPixels[Math.floor(Math.random() * unfilledScreenPixels.length)],
            isFilled: true,
            isTarget: true,
        };
    };

    const setTargetPixel = state => {
        const {newHead} = getSnakeParams(state);
        const newTarget = getNextTarget(
            state.screen, [...initSnakeBody, newHead]
        );
        const newScreenState = prepareNewScreenState(state.screen, [newTarget]);

        return {screen: newScreenState};
    };

    const snakeStateReducer = (state, action) => {
        if (action.type === TypeEnum.prepareAndExecNewTurn) {
            const {
                filteredBodyState,
                direction,
                cutTail,
                newHead
            } = getSnakeParams(state);

            const nextHeadPlace = { ...state.screen[fieldSize.x * newHead.y + newHead.x] };

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
                    ? { ...pix, isFilled: false }
                    : pix)
                .concat(newHead);

            let newScreenState = prepareNewScreenState(state.screen, newSnakeBodyState);

            if (nextHeadPlace.isTarget) {
                newScreenState = prepareNewScreenState(
                    newScreenState,
                    [getNextTarget(newScreenState, [cutTail])]
                );
            }

            const newDirection = state[direction];

            return {
                ...state,
                screen: newScreenState,
                body: newSnakeBodyState,
                currentDirection: newDirection
            };
        }

        if (action.type === TypeEnum.keyPressHandler) {
            action.payload.preventDefault();
            const direction = {
                ArrowLeft: {dir: 'backward', ax: 'horizontal'},
                ArrowRight: {dir: 'forward', ax: 'horizontal'},
                ArrowUp: {dir: 'backward', ax: 'vertical'},
                ArrowDown: {dir: 'forward', ax: 'vertical'},
                KeyA: {dir: 'backward', ax: 'horizontal'},
                KeyD: {dir: 'forward', ax: 'horizontal'},
                KeyW: {dir: 'backward', ax: 'vertical'},
                KeyS: {dir: 'forward', ax: 'vertical'}
            }[action.payload.code];

            if (!(state.nextDirection.dir === direction?.dir
                    && state.nextDirection.ax === direction?.ax)
                && direction
                && state.isGameRunning) {
                return {...state, nextDirection: direction}
            }

            return state;
        }

        if (action.type === TypeEnum.startOrPause) {
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

        if (action.type === TypeEnum.resetHandler) {
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

        if (action.type === TypeEnum.stopInterval) {
            return {
                ...state,
                restartFlag: state.isGameRunning || state.isGameOver,
                isGameRunning: false
            }
        }

        if (action.type === TypeEnum.startInterval) {
            return {
                ...state,
                restartFlag: false,
                isGameRunning: state.restartFlag
            }
        }

        return new Error();
    };

    const [snakeState, dispatchSnakeState] = useReducer(snakeStateReducer, initSnakeState);

    const resetGame = () => {
        dispatchSnakeState({
            type: TypeEnum.stopInterval
        });

        dispatchSnakeState({
            type: TypeEnum.resetHandler
        });

        dispatchSnakeState({
            type: TypeEnum.startInterval
        });
    };

    const keyPressHandler = event => {
        event.preventDefault();

        dispatchSnakeState({
            type: TypeEnum.keyPressHandler,
            payload: event
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
            type: TypeEnum.startOrPause
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
