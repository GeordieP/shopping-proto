import React, {
  useContext,
  useState
} from 'react';

// context & state management
import { TagsContext } from '../context';
import { actions } from '../state/tagsState';

// components
import StyledDialog from '../components/StyledDialog';

const Tag = ({ id, name }) => {
  return (
    <div>
      <p>({id}) {name}</p>
    </div>
  );
}

const TagList = ({ tags }) => {
  return tags.map(t => <Tag {...t} key={t.name} />)
}

export default () => {
  const { state: tags, dispatch } = useContext(TagsContext);

  return (
    <>
      <TagList tags={tags} />
    </>
  );
}
