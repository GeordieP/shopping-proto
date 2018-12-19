import produce from 'immer';

// Mock data stored on device as json
import storage from './storage_data';
export const initialState = storage.items;

// action types
const addItem = Symbol()
const removeItem = Symbol();
const updateItem = Symbol();

export const actions = {
  addItem: (item) => ({
    type: addItem,
    item
  }),

  removeItem: (id) => ({
    type: removeItem,
    id
  }),

  updateItem: (id, newFields) => ({
    type: updateItem,
    id,
    newFields
  }),
};

export const reducer = (state, action) => {
  switch(action.type) {
    case addItem: return produce(state, draft => {
      const foundIndex = state.findIndex(i => i.id === action.item.id);
      if (foundIndex !== -1) {
        console.error('Item', action.item.name, 'already exists; skipping');
        return state;
      }

      draft.push(action.item);
    });

    case removeItem: return produce(state, draft => {
      const index = draft.findIndex(i => i.id === action.id);
      // TODO: handle index -1
      draft.splice(index, 1)
    });

    case updateItem: return produce(state, draft => {
      const index = draft.findIndex(i => i.id === action.id);

      draft[index] = {
        ...draft[index],
        ...action.newFields
      }
    });

    default: return state;
  }
}
