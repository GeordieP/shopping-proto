import React, {
  useContext,
  useState
} from 'react';
import { Router } from '@reach/router';

// context & state management
import { TagsContext } from '../context';
import { actions as tagsActions } from '../state/tagsState';

import { ItemsContext } from '../context';
import { actions as itemsActions } from '../state/itemsState';

// hooks
import useFilterState, { applyFilters } from '../hooks/useFilterState';

// components
import TagFilterBar from '../components/TagFilterBar';
import { EditTagModal } from '../components/EditTag';

const Tag = ({ id, name, onRemove, items, onEdit }) => {
  return (
      <p>
        <button onClick={onRemove}>-</button>
        ({id}) {name} ({items.length} items)
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

  const { dispatch: itemsDispatch } = useContext(ItemsContext);

  const onRemoveTag = (id) => {
    // remove the tag from all items that reference it
    itemsDispatch(itemsActions.removeTagFromAll(id));

    // delete the tag itself
    dispatch(tagsActions.removeTag(id));
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
