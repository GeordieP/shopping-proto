import React, { useContext } from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';

// context & state management
import { ItemsContext } from '../context';
import { actions as itemsActions } from '../state/itemsState';

// hooks
import useFilterState, { applyFilters } from '../hooks/useFilterState';

// components
import FilterBar from '../components/FilterBar';
import { ListItemMenuModal } from '../components/ListItemMenu';

const Item = ({ name, price, completed, onComplete, onRemove, onOpenMenu }) => (
  <div>
    <button onClick={onRemove}>-</button>
    <button onClick={onComplete}>O</button>
    ${price} {name} {completed && '(Completed)'}
    <button onClick={onOpenMenu}>Menu</button>
  </div>
);

const List = ({ items, onRemoveItem, onCompleteItem, onOpenMenu }) => {
  return items.map(i =>
    <Item
      {...i}
      key={i.id}
      onRemove={onRemoveItem.bind(null, i.id)}
      onComplete={onCompleteItem.bind(null, i.id)}
      onOpenMenu={onOpenMenu.bind(null, i.id)}
    />
  );
}

const defaultFilterState = { listed: (item) => item.listed };

export default ({ navigate }) => {
  const { state, dispatch } = useContext(ItemsContext);
  const { filters, updateFilter, removeFilter } = useFilterState(defaultFilterState);
  const items = applyFilters(filters, state);

  const onCompleteItem = (id) => {
    dispatch(itemsActions.completeItem(id));
  }

  const onRemoveItem = (id) => {
    dispatch(itemsActions.unlistifyItem(id));
  }

  const openItemMenu = (id) => navigate(`itemMenu/${id}`);
  const closeItemMenu = () => navigate('/');

  return (
    <>
      <FilterBar updateFilter={updateFilter} removeFilter={removeFilter} />
      
      <h1>List ({ items.length })</h1>
      <List
        items={items}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
        onOpenMenu={openItemMenu}
        filters={filters}
      />

      <Router>
        <ListItemMenuModal path='/itemMenu/:itemID' onClose={closeItemMenu} />
      </Router>
    </>
  );
};
