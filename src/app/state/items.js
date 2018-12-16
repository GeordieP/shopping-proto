import produce from 'immer';

// Mock data stored on device as json
import storage from './storage_data';
export const initialState = storage.items;

// action types
const addItem = 'ITEM_ADD';
const removeItem = 'ITEM_REMOVE';

export const actions = {
  addItem: (item) => ({
    type: addItem,
    payload: item
  }),

  removeItem: (id) => ({
    type: removeItem,
    payload: id
  }),
};

export const reducer = (state, action) => {
  switch(action.type) {
    case addItem:
      return produce(state, draft => {
        draft.push(action.payload);
      });

    case removeItem:
      return produce(state, draft => {
        const index = draft.findIndex(i => i.id === action.payload);
        draft.splice(index, 1)
      });

    default: return state;
  }
}
