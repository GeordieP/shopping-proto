import React, { useContext } from 'react';
import styled from 'styled-components';

// context & state management
import { ItemsContext } from '../context';
import { actions as itemsActions } from '../state/itemsState';

// hooks
import useFilterState, { applyFilters } from '../hooks/useFilterState';

// components
import FilterBar from '../components/FilterBar';

const Item = ({ name, price, completed, onComplete, onRemove }) => (
  <div>
    <button onClick={onRemove}>-</button>
    <button onClick={onComplete}>O</button>
    ${price} {name} {completed && '(Completed)'}
  </div>
);

const List = ({ items, onRemoveItem, onCompleteItem }) => {
  return items.map(i =>
    <Item
      {...i}
      key={i.id}
      onRemove={onRemoveItem.bind(null, i.id)}
      onComplete={onCompleteItem.bind(null, i.id)}
    />
  );
}

const listedFilter = (item) => item.listed;

export default () => {
  const { state, dispatch } = useContext(ItemsContext);
  const { filters, updateFilter, removeFilter } = useFilterState({ listed: listedFilter });
  const items = applyFilters(filters, state);

  const onCompleteItem = (id) => {
    dispatch(itemsActions.completeItem(id));
  }

  const onRemoveItem = (id) => {
    dispatch(itemsActions.unlistifyItem(id));
  }

  return (
    <>
      <FilterBar updateFilter={updateFilter} removeFilter={removeFilter} />
      <h1>List ({ items.length })</h1>
      <List
        items={items}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
        filters={filters}
      />
    </>
  );
};
