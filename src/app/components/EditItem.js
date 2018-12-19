import React, {
  useState,
  useContext
} from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import { ItemsContext } from '../context';
import { actions } from '../state/itemsState';

const EditItem = ({ itemID, onCancel }) => {
  if (itemID == null) return null;
  itemID = parseInt(itemID);

  const { state, dispatch } = useContext(ItemsContext);
  // get item properties
  const item = state.find(i => i.id === itemID);
  if (item == null) return null;

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);

  const onSaveClick = () => {
    dispatch(actions.updateItem(itemID, {
      name, price,
    }))
    onCancel();
  }

  const updateName = (e) => {
    setName(e.currentTarget.value);
  }

  const updatePrice = (e) => {
    setPrice(e.currentTarget.value);
  }

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
    </div>
  );
}

export default EditItem;

const dialogContentStyles = {
  width: '95%',
  borderRadius: '5px'
};

export const EditItemModal = (props) => {
  // we don't handle modal showing/hiding state at this level.
  // However, when the modal is dismissed by clicking outside the content area,
  // call the onCancel fn, passed via props.

  return (
    <DialogOverlay onDismiss={props.onCancel}>
      <DialogContent style={dialogContentStyles}>
        <EditItem {...props} />
      </DialogContent>
    </DialogOverlay>
  );
}
