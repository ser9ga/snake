export const ActionTypes = {
    prepareAndExecNewTurn: 'prepareAndExecNewTurn',
    controlEventHandler: 'controlEventHandler',
    startOrPause: 'startOrPause',
    resetHandler: 'resetHandler',
    stopInterval: 'stopInterval',
    startInterval: 'startInterval',
}

export const DirectionTypes = {
    left: {dir: 'backward', ax: 'horizontal'},
    right: {dir: 'forward', ax: 'horizontal'},
    up: {dir: 'backward', ax: 'vertical'},
    down: {dir: 'forward', ax: 'vertical'}
}