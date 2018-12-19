import React, {
  useState,
  useContext
} from 'react';

// context & state management
import { TagsContext } from '../context';
import { actions } from '../state/tagsState';

// components
import StyledDialog from './StyledDialog';

const EditTag = ({ tagID, onCancel }) => {
  if (tagID == null) return null;
  tagID = parseInt(tagID);

  const { state, dispatch } = useContext(TagsContext);
  // get tag properties
  const tag = state.find(t => t.id === tagID);
  if (tag == null) return null;

  const [name, setName] = useState(tag.name);

  const onSaveClick = () => {
    dispatch(actions.updateTag(tagID, {
      name,
    }))
    onCancel();
  }

  const updateName = (e) => {
    setName(e.currentTarget.value);
  }

  return (
    <div>
      <h1>Edit Tag</h1>
      <button onClick={onSaveClick}>save</button>
      <button onClick={onCancel}>cancel</button>

      <div>
        <label>Name</label>
        <input type='text' value={name} onChange={updateName} />
      </div>
    </div>
  );
}

export default EditTag;

export const EditTagModal = (props) => {
  // we don't handle modal showing/hiding state at this level.
  // However, when the modal is dismissed by clicking outside the content area,
  // call the onCancel fn, passed via props.

  return (
    <StyledDialog onDismiss={props.onCancel}>
      <EditTag {...props} />
    </StyledDialog>
  );
}
