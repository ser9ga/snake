import {TCurrentDirection} from "../Types/TSnakeState";

export const DirectionTypes: {[key: string]: TCurrentDirection} = {
    left: {dir: 'backward', ax: 'horizontal'},
    right: {dir: 'forward', ax: 'horizontal'},
    up: {dir: 'backward', ax: 'vertical'},
    down: {dir: 'forward', ax: 'vertical'}
}
