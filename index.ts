import {createStore} from "./store/store";
import {reducer} from "./reducer/reducer";

export interface ReduxAction {
    readonly type: string;
}

interface Action extends ReduxAction {
    value?: number
}

export interface State {
    count: number;
    isLightTheme: boolean;
}

export const initialState: State = {
    count: 0,
    isLightTheme: true,
};

export const store = createStore<State, Action>(reducer, initialState);
