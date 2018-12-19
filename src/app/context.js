import React, { createContext, useReducer } from 'react';

// -- IMPORTS -- //

// ITEMS
import {
  reducer as itemsReducer,
  initialState as itemsInitialState
} from './state/itemsState';

// TAGS
import {
  reducer as tagsReducer,
  initialState as tagsInitialState
} from './state/tagsState';

// -- CONTEXT -- //

// ITEMS
export const ItemsContext = createContext();
export const ItemsContextProvider = createProvider(
  itemsReducer,
  itemsInitialState,
  ItemsContext
);

// TAGS
export const TagsContext = createContext();
export const TagsContextProvider = createProvider(
  tagsReducer,
  tagsInitialState,
  TagsContext
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
