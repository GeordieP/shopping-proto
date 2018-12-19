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

// filter states - static filter objects/functions to use with filter state hook.
// store these in module scope rather than re-creating them on every render.
//
// Listed: only show items that have their listed property set true
const listedFilterState = { listed: (item) => item.listed };
// Pending: only show items that have their completed property set false
const pendingFilterState = { pending: (item) => item.completed === false };
// Completed: only show items that have their completed property set true
const completedFilterState = { completed: (item) => item.completed };



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

const PendingItemsList = ({ items: allItems, onCompleteItem, onRemoveItem, openItemMenu }) => {
  const { filters } = useFilterState(pendingFilterState);
  const items = applyFilters(filters, allItems);

  return (
    <>
      <h1>Pending ({ items.length })</h1>
      <List
        items={items}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
        onOpenMenu={openItemMenu}
      />
    </>
  );
}

const CompletedItemsList = ({ items: allItems, onUncompleteItem, onRemoveItem, openItemMenu }) => {
  const { filters } = useFilterState(completedFilterState);
  const items = applyFilters(filters, allItems);

  return (
    <>
      <h1>Completed ({ items.length })</h1>
      <List
        items={items}
        onCompleteItem={onUncompleteItem}
        onRemoveItem={onRemoveItem}
        onOpenMenu={openItemMenu}
      />
    </>
  );
}

export default ({ navigate }) => {
  const { state, dispatch } = useContext(ItemsContext);
  const { filters, updateFilter, removeFilter } = useFilterState(listedFilterState);
  const items = applyFilters(filters, state);

  const onCompleteItem = (id) => {
    dispatch(itemsActions.completeItem(id));
  }

  const onUncompleteItem = (id) => {
    dispatch(itemsActions.uncompleteItem(id));
  }

  const onRemoveItem = (id) => {
    dispatch(itemsActions.unlistifyItem(id));
  }

  const openItemMenu = (id) => navigate(`itemMenu/${id}`);
  const closeItemMenu = () => navigate('/');

  return (
    <>
      <FilterBar updateFilter={updateFilter} removeFilter={removeFilter} />

      <PendingItemsList
        items={items}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
        openItemMenu={openItemMenu}
      />

      <CompletedItemsList
        items={items}
        onUncompleteItem={onUncompleteItem}
        onRemoveItem={onRemoveItem}
        openItemMenu={openItemMenu}
      />

      <Router>
        <ListItemMenuModal path='/itemMenu/:itemID' onClose={closeItemMenu} />
      </Router>
    </>
  );
};
