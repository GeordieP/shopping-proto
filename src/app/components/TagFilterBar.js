import React, { useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';

import { arrayContainsArray } from '../../util';

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid #fcc;
`;

export default ({ updateFilter, removeFilter }) => {
  const [searchValue, setSearchValue] = useState('');

  const updateSearch = (e) => {
    const { value } = e.currentTarget;
    setSearchValue(value);
    updateFilter('search', (item) => item.name.toLowerCase().includes(value));
  }

  const clearSearch = () => {
    setSearchValue('');
    removeFilter('search');
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
    </FilterBar>
  );
}
