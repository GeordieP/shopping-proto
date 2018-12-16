import React, { useContext } from 'react';
import styled from 'styled-components';

// context & state management actions
import { ItemsContext } from '../context';
import { actions } from '../state/items';

const Item = ({ id, name, price, onClick }) => (
  <p onClick={onClick}>${price} {name}</p>
);

const ItemList = ({ items, onRemoveItem }) => items.map(i =>
  <Item
    {...i}
    key={i.id}
    onClick={onRemoveItem.bind(null, i.id)}
  />
);

export default () => {
  const { state: items, dispatch } = useContext(ItemsContext);

  const onRemoveItem = (id) => {
    dispatch(actions.removeItem(id));
  }

  return (
    <>
      <h1>Items ({ items.length })</h1>
      <ItemList items={items} onRemoveItem={onRemoveItem} />
    </>
  );
}
