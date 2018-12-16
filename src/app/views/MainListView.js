import React, { useContext } from 'react';
import styled from 'styled-components';

// context & state management
import { ListContext } from '../context';
import { actions as listActions } from '../state/listState';

const Item = ({ name, price, completed, onComplete, onRemove }) => (
  <div>
    <Btn onClick={onRemove}>-</Btn>
    <Btn onClick={onComplete}>O</Btn>
    ${price} {name} {completed && '(Completed)'}
  </div>
);

const List = ({ listItems, onCompleteItem, onRemoveItem }) =>
  listItems.map(i =>
    <Item
      {...i}
      key={i.id}
      onRemove={onRemoveItem.bind(null, i.id)}
      onComplete={onCompleteItem.bind(null, i.id)}
    />
  );

export default () => {
  const { state: listItems, dispatch: listDispatch } = useContext(ListContext);

  const onCompleteItem = (id) => {
    listDispatch(listActions.completeListItem(id));
  }

  const onRemoveItem = (id) => {
    listDispatch(listActions.removeListItem(id));
  }

  return (
    <>
      <h1>List ({ listItems.length })</h1>
      <List
        listItems={listItems}
        onCompleteItem={onCompleteItem}
        onRemoveItem={onRemoveItem}
      />
    </>
  );
};

// Styled components

const Btn = styled.button`
  border: 1px solid dodgerblue;
  background: transparent;
  margin: 3px;
`;
