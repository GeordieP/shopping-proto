import produce from 'immer';

// Mock data stored on device as json
import storage from './storage_data';
export const initialState = storage.tags;

// action types
const addTag = Symbol()
const removeTag = Symbol();
const updateTag = Symbol();
const addItemToTag = Symbol();
const removeItemFromTag = Symbol();

export const actions = {
  addTag: (tag) => ({
    type: addTag,
    tag
  }),

  removeTag: (id) => ({
    type: removeTag,
    id
  }),

  updateTag: (id, newFields) => ({
    type: updateTag,
    id,
    newFields
  }),

  addItemToTag: () => ({
    // TODO
  }),

  removeItemFromTag: () => ({
    // TODO
  }),
};

export const reducer = (state, action) => {
  switch(action.type) {
    case addTag: return produce(state, draft => {
      // TODO
    });

    case removeTag:  return produce(state, draft => {
      // TODO
    });

    case updateTag:  return produce(state, draft => {
      // TODO
    });

    case addItemToTag: return produce(state, draft => {
      // TODO
    });

    case removeItemFromTag:  return produce(state, draft => {
      // TODO
    });

    default: return state;
  }
}
