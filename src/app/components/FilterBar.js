import React, { useState } from 'react';
import styled from 'styled-components';

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ({ updateFilter, removeFilter }) => {
  const [searchValue, setSearchValue] = useState('');
  const [completed, setCompleted] = useState(false);

  const updateSearch = (e) => {
    const { value } = e.currentTarget;
    setSearchValue(value);
    updateFilter('search', (item) => item.name.toLowerCase().includes(value));
  }

  const clearSearch = () => {
    setSearchValue('');
    removeFilter('search');
  }

  const updateCompleted = () => {
    const newCompleted = !completed;
    if (newCompleted)
      updateFilter('completed', (item) => item.completed === newCompleted);
    else
      removeFilter('completed');
    setCompleted(newCompleted);
  }

  return (
    <FilterBar>
      <div>
        <input
          type='text'
          placeholder='Search'
          value={searchValue}
          onChange={updateSearch}
        />
        <button onClick={clearSearch}>x</button>
      </div>

      <label htmlFor='check'>Completed</label>
      <input id='check' type='checkbox' value={completed} onChange={updateCompleted} />
    </FilterBar>
  );
}
