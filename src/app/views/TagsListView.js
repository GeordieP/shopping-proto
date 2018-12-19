import React, {
  useContext,
  useState
} from 'react';
import { Router } from '@reach/router';

// context & state management
import { TagsContext } from '../context';
import { actions } from '../state/tagsState';

// hooks
import useFilterState, { applyFilters } from '../hooks/useFilterState';

// components
import TagFilterBar from '../components/TagFilterBar';
import { EditTagModal } from '../components/EditTag';

const Tag = ({ id, name, onRemove, onEdit }) => {
  return (
      <p>
        <button onClick={onRemove}>-</button>
        ({id}) {name}
        <button onClick={onEdit}>Edit</button>
      </p>
  );
}

const TagList = ({ tags, onRemoveTag, onEditTag }) => {
  return tags.map(t =>
    <Tag
      {...t}
      key={t.name}
      onRemove={onRemoveTag.bind(null, t.id)}
      onEdit={onEditTag.bind(null, t.id)}
    />
  );
}

export default ({ navigate }) => {
  const { state, dispatch } = useContext(TagsContext);
  const { filters, updateFilter, removeFilter } = useFilterState();
  const tags = applyFilters(filters, state);
  
  const onRemoveTag = (id) => {
    dispatch(actions.removeTag(id));
  }

  const onEditTag = (tagID) => navigate(`edit/${tagID}`);
  const onCancelEditTag = () => navigate(`/tags`);

  return (
    <>
      <TagFilterBar updateFilter={updateFilter} removeFilter={removeFilter} />

      <TagList
        tags={tags}
        onRemoveTag={onRemoveTag}
        onEditTag={onEditTag}
      />

      <Router>
        <EditTagModal path='/edit/:tagID' onCancel={onCancelEditTag} />
      </Router>
    </>
  );
}
