import {initialState} from "../index";

export interface ReduxAction {
    readonly type: string;
}

const counterReducer = <State, Action extends ReduxAction>(state, action): number => {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
    }
    return state;
}

const themeReducer = <State, Action extends ReduxAction>(state, action): boolean => {
    switch (action.type) {
        case 'toggle':
            return !state;
    }
    return state;
}

enum stateKeys {
    counter = 'count',
    theme = 'isLightTheme'
}

const combineReducers = (reducers, initialState) => {
    const reducersKey = Object.keys(reducers);

    return function combination <State, Action extends ReduxAction>(state: State, action: Action): State {
        const nextState = initialState;

        reducersKey.forEach(key => {
            const reducer = reducers[key];
            const previousReducerState = state[stateKeys[key]];
            nextState[stateKeys[key]] = reducer(previousReducerState, action);
        });
        return nextState;
    };
}

export const reducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer,
}, initialState);