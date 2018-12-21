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

  addItemToTag: (id, itemID) => ({
    type: addItemToTag,
    id,
    itemID
  }),

  removeItemFromTag: (id, itemID) => ({
    type: removeItemFromTag,
    id,
    itemID
  }),
};

export const reducer = (state, action) => {
  switch(action.type) {
    case addTag: {
      const foundIndex = state.findIndex(t => t.id === action.tag.id);
      if (foundIndex !== -1) {
        console.error('Tag', action.tag.name, 'already exists; skipping');
        return state;
      }

      return produce(state, draft => {
        draft.push(action.tag);
      });
    }

    case removeTag: return produce(state, draft => {
      // TODO: remove the tag ID from all items that have it
      const index = draft.findIndex(t => t.id === action.id);
      // TODO: handle index -1
      draft.splice(index, 1);
    });

    case updateTag: return produce(state, draft => {
      const index = draft.findIndex(t => t.id === action.id);

      draft[index] = {
        ...draft[index],
        ...action.newFields
      }
    });

    case addItemToTag: return produce(state, draft => {
      const index = draft.findIndex(t => t.id === action.id);
      draft[index].items.push(action.itemID);
    });

    case removeItemFromTag:  return produce(state, draft => {
      const index = draft.findIndex(t => t.id === action.id);
      const tag = draft[index];
      const itemIndex = tag.items.findIndex(i => i.id === action.itemID);
      
      tag.items.splice(itemIndex, 1);
    });

    default: return state;
  }
}
