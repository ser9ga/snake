import React, {useEffect, useState} from 'react';

const GameControl = getNextDirection => {

    const [nextDirection, setNextDirection] = useState('right')

    const keyPressHandler = e => {
        console.log('code: ', e.code)
        const direction = {
            ArrowLeft: 'left',
            ArrowRight: 'right',
            ArrowUp: 'up',
            ArrowDown: 'down',
            KeyA: 'left',
            KeyD: 'right',
            KeyW: 'up',
            KeyS: 'down'
        }[e.key]
        setNextDirection(direction)
    }

    useEffect(() => {
        document.addEventListener('keydown', e => keyPressHandler(e));
    });
};

export default GameControl;
