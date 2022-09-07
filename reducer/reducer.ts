export interface ReduxAction {
    readonly type: string;
}

const counterReducer = <State, Action extends ReduxAction>(state, {type, value = 1}): number => {
    switch (type) {
        case 'increment':
            return state + value;
        case 'decrement':
            return state - value;
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

const combineReducers = (reducers) => {
    const reducersKey = Object.keys(reducers);

    return function combination <State, Action extends ReduxAction>(state: State, action: Action): State {
        const nextState = [] as State;

        reducersKey.forEach(key => {
            const reducer = reducers[key];
            const previousReducerStateForKey = state[stateKeys[key]];
            nextState[stateKeys[key]] = reducer(previousReducerStateForKey, action);
        });
        return nextState;
    };
}

export const reducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer,
});