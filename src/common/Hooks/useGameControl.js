import { useEffect } from 'react';

export const useGameControl = (keyPressHandler) => {
    const handler = event => keyPressHandler(event);

    useEffect(() => {
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, []);
};
