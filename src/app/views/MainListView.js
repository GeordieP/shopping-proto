import React, { useContext } from 'react';
import styled from 'styled-components';

// context & state management
import { ListContext } from '../context';
import { actions as listActions } from '../state/listState';

// hooks
import useFilterState, { applyFilters } from '../hooks/useFilterState';

// components
import FilterBar from '../components/FilterBar';

const Item = ({ name, price, completed, onComplete, onRemove }) => (
  <div>
    <Btn onClick={onRemove}>-</Btn>
    <Btn onClick={onComplete}>O</Btn>
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

export default () => {
  const { state, dispatch: listDispatch } = useContext(ListContext);
  const { filters, updateFilter, removeFilter } = useFilterState();

  const items = applyFilters(filters, state);

  const onCompleteItem = (id) => {
    listDispatch(listActions.completeListItem(id));
  }

  const onRemoveItem = (id) => {
    listDispatch(listActions.removeListItem(id));
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

// Styled components

const Btn = styled.button`
  border: 1px solid dodgerblue;
  background: transparent;
  margin: 3px;
`;
