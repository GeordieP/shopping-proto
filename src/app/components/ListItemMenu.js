import React, { useContext } from 'react';

// context & state management
import { ItemsContext } from '../context';
import { actions } from '../state/itemsState';

// components
import StyledDialog from './StyledDialog';

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

export const ListItemMenuModal = (props) => {
  return (
    <StyledDialog onDismiss={props.onClose}>
      <ListItemMenu {...props} />
    </StyledDialog>
  );
}
