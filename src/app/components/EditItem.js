import React, {
  useState,
  useContext
} from 'react';
import styled from 'styled-components';

// context & state management
import { ItemsContext } from '../context';
import { actions as itemsActions } from '../state/itemsState';
import { TagsContext } from '../context';
import { actions as tagsActions } from '../state/tagsState';

// components
import StyledDialog from './StyledDialog';

const EditItem = ({ itemID, onCancel }) => {
  if (itemID == null) return null;
  itemID = parseInt(itemID);

  const { state: itemsState, dispatch: itemsDispatch } = useContext(ItemsContext);
  // get item properties
  const item = itemsState.find(i => i.id === itemID);
  if (item == null) return null;

  // consume tags context for full tags list
  const { state: tags, dispatch: tagsDispatch } = useContext(TagsContext);

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);

  const onSaveClick = () => {
    itemsDispatch(itemsActions.updateItem(itemID, {
      name, price,
    }));
    onCancel();
  }

  const updateName = (e) => {
    setName(e.currentTarget.value);
  }

  const updatePrice = (e) => {
    setPrice(e.currentTarget.value);
  }

  const addTag = (tagID) => {
    itemsDispatch(itemsActions.addTag(item.id, tagID));
    tagsDispatch(tagsActions.addItemToTag(tagID, item.id));
  }

  const removeTag = (tagID) => {
    itemsDispatch(itemsActions.removeTag(item.id, tagID));
    tagsDispatch(tagsActions.removeItemFromTag(tagID, item.id));
  }

  // item.tags just contains IDs; we need a list of each tag as its full tag object
  const itemTags = item.tags.map(tID => tags.find(t => t.id === tID));
  // all tags that haven't yet been added to this item
  const remainingTags = tags.filter(t => item.tags.indexOf(t.id) === -1);

  return (
    <div>
      <h1>Edit Item</h1>
      <button onClick={onSaveClick}>save</button>
      <button onClick={onCancel}>cancel</button>

      <div>
        <label>Name</label>
        <input type='text' value={name} onChange={updateName} />
      </div>

      <div>
        <label>Price</label>
        <input type='text' value={price} onChange={updatePrice} />
      </div>

      <div>
        <h3>Tags (Tap to remove)</h3>
        { itemTags.length > 0 &&
          itemTags.map(t => (
            <ClickableTag
              key={`items_${t.id}`}
              tag={t}
              onClick={removeTag.bind(null, t.id)}
            />
          ))
        }
      </div>

      <div>
        <h3>All Tags (Tap to add)</h3>
        { remainingTags.length > 0 &&
          remainingTags.map(t =>(
            <ClickableTag
              key={`remainingTags_${t.id}`}
              tag={t}
              onClick={addTag.bind(null, t.id)}
            />
          ))
        }
      </div>
    </div>
  );
}

const T = styled.div`
  border: 2px solid dodgerblue;
  border-radius: 4px;
  margin: 3px;
  padding: 3px;
  display: inline-block;
`;

function ClickableTag({ tag, onClick }) {
  return (
    <T onClick={onClick}>{ tag.name }</T>
  );
}

export default EditItem;

export const EditItemModal = (props) => {
  // we don't handle modal showing/hiding state at this level.
  // However, when the modal is dismissed by clicking outside the content area,
  // call the onCancel fn, passed via props.

  return (
    <StyledDialog onDismiss={props.onCancel}>
      <EditItem {...props} />
    </StyledDialog>
  );
}
