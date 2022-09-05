import {ReduxAction} from "../index";

export type Reducer<State, Action extends ReduxAction> = (
    state: State | undefined,
    action: Action
) => State;

export interface Store<State, Action extends ReduxAction> {
    getState(): State;

    dispatch(action: Action): void;

    subscribe(callback: () => void): () => void;
}

export function createStore<State, Action extends ReduxAction>(
    reducer: Reducer<State, Action>,
    initialState?: State
): Store<State, Action> {
    let state = initialState;
    let subscribers = [];

    return {
        getState(): State {
            return state;
        },
        dispatch(action: Action) {
            state = reducer(state, action);
            subscribers.forEach(sub => sub());
        },
        subscribe(callback) {
            subscribers.push(callback);
            return () => {
                subscribers.splice(subscribers.indexOf(callback), 1)
            }
        }
    }
}