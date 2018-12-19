import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';

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

export default ({ navigate }) => {
  const { state, dispatch: itemsDispatch } = useContext(ItemsContext);
  const { dispatch: listDispatch } = useContext(ListContext);
  const { filters, updateFilter, removeFilter } = useFilterState();
  const items = applyFilters(filters, state);

  const onRemoveItem = (id) => {
    itemsDispatch(itemsActions.removeItem(id));
  }

  const onListifyItem = (item) => {
    listDispatch(listActions.addListItem(item));
  }

  const onEditItem = (itemID) => navigate(`edit/${itemID}`);
  const onCancelEditItem = () => navigate(`/items`);

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

      <Router>
        <EditItemModal path='/edit/:itemID' onCancel={onCancelEditItem} />
      </Router>
    </>
  );

}
