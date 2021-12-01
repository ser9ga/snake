import React, { useEffect } from 'react';

const GameControl = ({ keyPressHandler }) => {
    const handler = event => keyPressHandler(event);

    useEffect(() => {
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, []);

    return <div/>;
};

export default GameControl;
