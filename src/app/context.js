import React, { createContext, useReducer } from 'react';

// -- IMPORTS -- //

// ITEMS
import {
  reducer as itemsReducer,
  initialState as itemsInitialState
} from './state/itemsState';

// LIST
import {
  reducer as listReducer,
  initialState as listInitialState
} from './state/listState';

// -- CONTEXT -- //

// ITEMS
export const ItemsContext = createContext();
export const ItemsContextProvider = createProvider(
  itemsReducer,
  itemsInitialState,
  ItemsContext
);

// LIST
export const ListContext = createContext();
export const ListContextProvider = createProvider(
  listReducer,
  listInitialState,
  ListContext
);

// -- MISC -- //

// Helper to create a generic provider component with the necessary bindings.
function createProvider(reducer, initialState, context) {
  return ({ children, ...props }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    return (
      <context.Provider value={{ state, dispatch }} {...props}>
        { children}
      </context.Provider>
    );
  }
}
