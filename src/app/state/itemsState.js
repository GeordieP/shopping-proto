import produce from 'immer';

// Mock data stored on device as json
import storage from './storage_data';
export const initialState = storage.items;

// action types
const addItem = Symbol()
const removeItem = Symbol();
const updateItem = Symbol();
const addTag = Symbol();
const removeTag = Symbol();

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

  completeItem: (id) => ({
    type: updateItem,
    id,
    newFields: { completed: true }
  }),

  uncompleteItem: (id) => ({
    type: updateItem,
    id,
    newFields: { completed: false }
  }),

  listifyItem: (id) => ({
    type: updateItem,
    id,
    newFields: { listed: true }
  }),

  unlistifyItem: (id) => ({
    type: updateItem,
    id,
    newFields: { listed: false }
  }),

  addTag: (id, tagID) => ({
    type: addTag,
    id,
    tagID
  }),

  removeTag: (id, tagID) => ({
    type: removeTag,
    id,
    tagID
  }),
};

export const reducer = (state, action) => {
  switch(action.type) {
    case addItem: {
      const foundIndex = state.findIndex(i => i.id === action.item.id);
      if (foundIndex !== -1) {
        console.error('Item', action.item.name, 'already exists; skipping');
        return state;
      }

      return produce(state, draft => {
        draft.push(action.item);
      });
    }

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

    case addTag: return produce(state, draft => {
      const index = draft.findIndex(i => i.id === action.id);
      draft[index].tags.push(action.tagID);
    });

    case removeTag: return produce(state, draft => {
      const index = draft.findIndex(i => i.id === action.id);
      const item = draft[index];
      const tagIndex = item.tags.findIndex(t => t.id === action.tagID);

      item.tags.splice(tagIndex, 1);
    });

    default: return state;
  }
}
