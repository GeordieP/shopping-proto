import React, { createContext, useReducer } from 'react';

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

// ITEMS
export const ItemsContext = createContext();
export const ItemsContextProvider = ({ children, ...props}) => {
  const [state, dispatch] = useReducer(itemsReducer, itemsInitialState);

  return (
    <ItemsContext.Provider value={{ state, dispatch }} {...props}>
      { children }
    </ItemsContext.Provider>
  );
}

// LIST
export const ListContext = createContext();
export const ListContextProvider = ({ children, ...props}) => {
  const [state, dispatch] = useReducer(listReducer, listInitialState);

  return (
    <ListContext.Provider value={{ state, dispatch }} {...props}>
      { children }
    </ListContext.Provider>
  );
}
