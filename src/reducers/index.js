"use client";
import React from 'react'
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import MenuItemReducers from './menuItemReducers';

const AppReducer = ({ children }) => {
    const store = createStore(
        combineReducers({
            menuItemReducers: MenuItemReducers
        })
    );
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default AppReducer