import {describe, expect, test} from '@jest/globals';
import {createStore} from "./store/store";
import {reducer} from "./reducer/reducer";

const initialState = {
    count: 0,
    isLightTheme: true,
}

describe('check getState method', () => {
    test('getState method should return initialState object', () => {
        const store = createStore(reducer, initialState);
        expect(store.getState()).toBe(initialState);
    });

    test('getState method should return object with count field = -1', () => {
        const store = createStore(reducer, initialState);
        store.dispatch({type: 'decrement'});
        expect(store.getState().count).toBe( -1);
    });
});

describe('check dispatch method', () => {
    test('after some actions "increment" and "decrement" are dispatched State field "count" should be equal -10', () => {
        const store = createStore(reducer, initialState);
        store.dispatch({type: 'increment'});
        store.dispatch({type: 'increment'});
        store.dispatch({type: 'increment'});
        store.dispatch({type: 'decrement', value: 13});
        expect(store.getState()['count']).toBe(-10);
    });

    test('after action "increment" is dispatched State field "isLightTheme" should be equal true', () => {
        const store = createStore(reducer, initialState);
        store.dispatch({type: 'increment'});
        expect(store.getState()['isLightTheme']).toBe(true);
    });

    test('after action "toggle" is dispatched State field "isLightTheme" should be equal false', () => {
        const store = createStore(reducer, initialState);
        store.dispatch({type: 'toggle'});
        expect(store.getState()['isLightTheme']).toBe(false);
    });
});

describe('check subscribe method', () => {

    test('subscribe callback is called each time when action is dispatched', () => {
        const store = createStore(reducer, initialState);
        let numberOfDispatchCalls = 0;
        store.subscribe(() => {
            numberOfDispatchCalls += 1
        });
        store.dispatch({type: 'increment'});
        store.dispatch({type: 'increment'});
        store.dispatch({type: 'increment'});
        store.dispatch({type: 'decrement'});
        store.dispatch({type: 'toggle'});
        store.dispatch({type: 'random'});
        expect(numberOfDispatchCalls).toBe(6);
    });

    test('unsubscribe method cancel subscription', () => {
        const store = createStore(reducer, initialState);

        let subRes1, subRes2, subRes3, subRes4;

        const unsubscribe1 = store.subscribe(() => {
            subRes1 = 'some calculations of 1th subscriber';
        });

        const unsubscribe2 = store.subscribe(() => {
            subRes2 = 'some calculations of 2th subscriber';
        });
        unsubscribe2();

        const unsubscribe3 = store.subscribe(() => {
            subRes3 = 'some calculations of 3th subscriber';
        });
        unsubscribe3();

        const unsubscribe4 = store.subscribe(() => {
            subRes4 = 'some calculations of 4th subscriber';
        });

        store.dispatch({type: 'random'});
        expect(subRes1).not.toBe(undefined);
        expect(subRes2).toBe(undefined);
        expect(subRes3).toBe(undefined);
        expect(subRes4).not.toBe(undefined);
    });
});