import React, { useContext } from 'react';
import styled from 'styled-components';

// context & state management
import { ItemsContext, ListContext } from '../context';
import { actions as itemsActions } from '../state/itemsState';
import { actions as listActions } from '../state/listState';

// hooks
import useFilterState from '../hooks/useFilterState';

// components
import FilterBar from '../components/FilterBar';

const Item = ({ name, price, onRemove, onListify }) => (
  <div>
    <Btn onClick={onRemove}>-</Btn>
    <Btn onClick={onListify}>+</Btn>
    ${price} {name}
  </div>
);

const ItemList = ({ items, onRemoveItem, onListifyItem, filters }) => {
  const filteredItems = filters.reduce((itms, filterFn) => {
    return itms.filter(filterFn);
  }, items);

  return filteredItems.map(i =>
    <Item
      {...i}
      key={i.id}
      onRemove={onRemoveItem.bind(null, i.id)}
      onListify={onListifyItem.bind(null, i)}
    />
  );
}

export default () => {
  const { state: items, dispatch: itemsDispatch } = useContext(ItemsContext);
  const { dispatch: listDispatch } = useContext(ListContext);
  const { filters, updateFilter, removeFilter } = useFilterState();

  const onRemoveItem = (id) => {
    itemsDispatch(itemsActions.removeItem(id));
  }

  const onListifyItem = (item) => {
    listDispatch(listActions.addListItem(item));
  }

  return (
    <>
      <FilterBar updateFilter={updateFilter} removeFilter={removeFilter} />
      <h1>Items ({ items.length })</h1>
      <ItemList
        items={items}
        onRemoveItem={onRemoveItem}
        onListifyItem={onListifyItem}
        filters={filters}
      />
    </>
  );
}

// Styled components

const Btn = styled.button`
  border: 1px solid dodgerblue;
  background: transparent;
  margin: 3px;
`;
