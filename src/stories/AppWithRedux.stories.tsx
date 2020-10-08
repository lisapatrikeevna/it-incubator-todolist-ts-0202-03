import React from 'react';
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
};

export const AppWithReduxExample = (props: any) => {
    return (
        // <Provider store={store}>
            <AppWithRedux/>
        // </Provider>
    )
};

