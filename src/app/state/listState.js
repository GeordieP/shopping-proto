import produce from 'immer';

// Mock data stored on device as json
import storage from './storage_data';
export const initialState = storage.list;

// action types
const addListItem = Symbol();
const setCompletedStatus = Symbol();
const removeListItem = Symbol();

export const actions = {
  addListItem: (item) => ({
    type: addListItem,
    item
  }),

  completeListItem: (id) => ({
    type: setCompletedStatus,
    id,
    completed: true,
  }),

  uncompleteListItem: (id) => ({
    type: setCompletedStatus,
    id,
    completed: false,
  }),

  removeListItem: (id) => ({
    type: removeListItem,
    id
  }),
};

export const reducer = (state, action) => {
  switch(action.type) {
    case addListItem:
      const foundIndex = state.findIndex(i => i.id === action.item.id);
      if (foundIndex !== -1) {
        console.error('Item', action.item.name, 'already added to list; skipping');
        return state;
      }

      return produce(state, draft => {
        draft.push(action.item);
      });

    case setCompletedStatus: return produce(state, draft => {
      const index = draft.findIndex(i => i.id === action.id);
      // TODO: handle index -1
      draft[index].completed = action.completed;
    });

    case removeListItem: return produce(state, draft => {
      const index = draft.findIndex(i => i.id === action.id);
      // TODO: handle index -1
      draft.splice(index, 1)
    });

    default: return state;
  }
}
