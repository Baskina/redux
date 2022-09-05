import {createStore} from "./store/store";

export const initialState: State = {
    count: 0,
    isLightTheme: true,
};

import {reducer} from "./reducer/reducer";

export interface ReduxAction {
    readonly type: string;
}

export interface State {
    count: number;
    isLightTheme: boolean;
}

export const store = createStore<State, ReduxAction>(reducer, initialState);