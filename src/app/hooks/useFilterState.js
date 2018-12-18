import React, {
  useState,
} from 'react';
import produce from 'immer';

const useFilterState = () => {
  const [filterState, setFilterState] = useState({});

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

export default useFilterState;
