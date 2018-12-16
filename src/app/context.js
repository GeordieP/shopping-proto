import React, { createContext, useReducer } from 'react';

// ITEMS
import {
  reducer as itemsReducer,
  initialState as itemsInitialState
} from './state/items';

// ITEMS
export const ItemsContext = createContext();
export const ItemsContextProvider = ({ children, ...props}) => {
  const [state, dispatch] = useReducer(itemsReducer, itemsInitialState);

  return (
    <ItemsContext.Provider value={{ state, dispatch}} {...props}>
      { children }
    </ItemsContext.Provider>
  );
}
