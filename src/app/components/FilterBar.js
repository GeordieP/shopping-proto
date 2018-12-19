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

const TagListItem = styled.div`
  border: 1px solid dodgerblue;
`;

const Tag = ({ tag, toggleTag }) => {
  const [toggled, setToggled] = useState(false);

  const toggle = () => {
    const newState = !toggled;
    toggleTag(tag, newState);
    setToggled(newState);
  }

  return (
    <TagListItem>
      <input id='toggled' type='checkbox' checked={toggled} readOnly disabled />

      <button onClick={toggle}>{tag}</button>
    </TagListItem>
  );
}

const TagFilter = ({ tags, toggleTag }) =>
  tags.map(t => (
    <Tag
      tag={t}
      key={t}
      toggleTag={toggleTag}
    />
  ));

export default ({ updateFilter, removeFilter }) => {
  const [searchValue, setSearchValue] = useState('');
  const [completed, setCompleted] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

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

  const toggleTag = (tag, enabled) => {
    const newTags = produce(selectedTags, draft => {
      // add if enabled, remove if not
      if (enabled)
        draft.push(tag);
      else
        draft.splice(draft.indexOf(tag), 1);
    });

    updateFilter('tags', (item) => arrayContainsArray(newTags, item.tags));
    setSelectedTags(newTags);
  }

  // TODO: use tags context to get all tags
  const allTags = ['one', 'two', 'three']; // TEMP

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
      <input id='check' type='checkbox' checked={completed} onChange={updateCompleted} />

      <TagFilter
        tags={allTags}
        toggleTag={toggleTag}
      />
    </FilterBar>
  );
}
