import { useEffect } from 'react';

export const useGameControl = (keyPressHandler: (event: KeyboardEvent) => void) => {
    const listener = (event: KeyboardEvent) => keyPressHandler(event);

    useEffect(() => {
        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, []);
};
