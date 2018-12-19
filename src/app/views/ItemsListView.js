import React, { useContext, useState } from 'react';
import styled from 'styled-components';

// context & state management
import { ItemsContext, ListContext } from '../context';
import { actions as itemsActions } from '../state/itemsState';
import { actions as listActions } from '../state/listState';

// hooks
import useFilterState, { applyFilters } from '../hooks/useFilterState';

// components
import FilterBar from '../components/FilterBar';
import { EditItemModal } from '../components/EditItem';

const Item = ({ name, price, tags, onRemove, onListify, onEdit }) => (
  <div>
    <button onClick={onRemove}>-</button>
    <button onClick={onListify}>+</button>
    ${price} {name}
    ({ tags.map(t => <span key={t}>{t}, </span>)})
    <button onClick={onEdit}>Edit</button>
  </div>
);

const ItemList = ({ items, onRemoveItem, onListifyItem, onEditItem }) => {
  return items.map(i =>
    <Item
      {...i}
      key={i.id}
      onRemove={onRemoveItem.bind(null, i.id)}
      onListify={onListifyItem.bind(null, i)}
      onEdit={onEditItem.bind(null, i.id)}
    />
  );
}

export default () => {
  const { state, dispatch: itemsDispatch } = useContext(ItemsContext);
  const { dispatch: listDispatch } = useContext(ListContext);
  const { filters, updateFilter, removeFilter } = useFilterState();
  const [itemToEdit, setItemToEdit] = useState(-1);
  const [showEditModal, setShowEditModal] = useState(false);
  const items = applyFilters(filters, state);

  const onRemoveItem = (id) => {
    itemsDispatch(itemsActions.removeItem(id));
  }

  const onListifyItem = (item) => {
    listDispatch(listActions.addListItem(item));
  }

  const onEditItem = (itemID) => {
    setItemToEdit(itemID);
    setShowEditModal(true);
  }

  const onCancelEditItem = () => {
    setItemToEdit(-1);
    setShowEditModal(false);
  }

  return (
    <>
      <FilterBar updateFilter={updateFilter} removeFilter={removeFilter} />

      <h1>Items ({ items.length })</h1>
      <ItemList
        items={items}
        onRemoveItem={onRemoveItem}
        onListifyItem={onListifyItem}
        onEditItem={onEditItem}
        filters={filters}
      />

      { itemToEdit !== -1 && showEditModal && (
        <EditItemModal itemID={itemToEdit} onCancel={onCancelEditItem} />
      )}
    </>
  );
}
