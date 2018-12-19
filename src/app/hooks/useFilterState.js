import React, {
  useState,
} from 'react';
import produce from 'immer';

export default (defaultFilters = {}) => {
  const [filterState, setFilterState] = useState(defaultFilters);

  const updateFilter = (name, filter) => {
    setFilterState(produce(filterState, draft => {
      draft[name] = filter;
    }))
  }

  const removeFilter = (name) => {
    setFilterState(produce(filterState, draft => {
      delete draft[name];
    }))
  }

  return {
    filters: Object.values(filterState),
    updateFilter,
    removeFilter
  };
}

export const applyFilters = (filters, items) =>
  filters.reduce((accumulator, filter) => accumulator.filter(filter), items);
