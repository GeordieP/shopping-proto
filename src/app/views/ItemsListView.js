import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';

// context & state management
import { ItemsContext } from '../context';
import { actions as itemsActions } from '../state/itemsState';

import { TagsContext } from '../context';
import { actions as tagsActions } from '../state/tagsState';

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
  const { state, dispatch } = useContext(ItemsContext);
  const { filters, updateFilter, removeFilter } = useFilterState();
  const items = applyFilters(filters, state);

  const { dispatch: tagsDispatch } = useContext(TagsContext);

  const onRemoveItem = (id) => {
    // remove the item from all tags that reference it
    tagsDispatch(tagsActions.removeItemFromAllTags(id));

    // delete the item itself
    dispatch(itemsActions.removeItem(id));
  }

  const onListifyItem = (item) => {
    dispatch(itemsActions.listifyItem(item.id));
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
      />

      <Router>
        <EditItemModal path='/edit/:itemID' onCancel={onCancelEditItem} />
      </Router>
    </>
  );
}
