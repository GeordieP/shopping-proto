import React, {
  useState,
  useContext
} from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { ItemsContext } from '../context';
import { actions } from '../state/itemsState';

const ListItemMenu = ({ navigate, itemID, onClose }) => {
  if (itemID == null) return null;
  itemID = parseInt(itemID);

  const { state, dispatch } = useContext(ItemsContext);
  const item = state.find(i => i.id === itemID);

  const unlistifyItem = () => {
    dispatch(actions.unlistifyItem(itemID));
    onClose();
  }

  const editItem = () => navigate(`/items/edit/${itemID}`);

  return (
    <>
      <h1>Item Menu</h1>
      <p>{item.name}</p>
      <p>${item.price}</p>

      <button onClick={unlistifyItem}>Remove from list</button>
      <button onClick={editItem}>Edit Item</button>
      <button onClick={onClose}>Close Menu</button>
    </>
  );
}

export default ListItemMenu;

const dialogContentStyles = {
  width: '95%',
  borderRadius: '5px'
};

export const ListItemMenuModal = (props) => {
  return (
    <DialogOverlay onDismiss={props.onClose}>
      <DialogContent style={dialogContentStyles}>
        <ListItemMenu {...props} />
      </DialogContent>
    </DialogOverlay>
  );
}
