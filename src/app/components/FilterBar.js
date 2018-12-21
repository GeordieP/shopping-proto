import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import produce from 'immer';

import { arrayContainsArray } from '../../util';

// context & state management
import { TagsContext } from '../context';

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
    toggleTag(tag.id, newState);
    setToggled(newState);
  }

  return (
    <TagListItem>
      <input id='toggled' type='checkbox' checked={toggled} readOnly disabled />

      <button onClick={toggle}>{tag.name}</button>
    </TagListItem>
  );
}

const TagFilter = ({ tags, toggleTag }) =>
  tags.map(t => (
    <Tag
      tag={t}
      key={t.id}
      toggleTag={toggleTag}
    />
  ));

export default ({ updateFilter, removeFilter }) => {
  const [searchValue, setSearchValue] = useState('');
  const [completed, setCompleted] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const { state: allTags } = useContext(TagsContext);

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

  const toggleTag = (tagID, enabled) => {
    const newTags = produce(selectedTags, draft => {
      // add if enabled, remove if not
      if (enabled)
        draft.push(tagID);
      else
        draft.splice(draft.indexOf(tagID), 1);
    });

    updateFilter('tags', (item) => arrayContainsArray(newTags, item.tags));
    setSelectedTags(newTags);
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
      <input id='check' type='checkbox' checked={completed} onChange={updateCompleted} />

      <TagFilter
        tags={allTags}
        toggleTag={toggleTag}
      />
    </FilterBar>
  );
}
