import {State, store} from "../index";

export type Selector<State, Selected> = (state: State) => Selected;

type StateField = number | boolean;

export const getSelector: Selector<keyof State, StateField> = (selector): StateField => {
    return store.getState()[selector]
}