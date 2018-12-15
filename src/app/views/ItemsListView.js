import React, { useContext } from 'react';
import { StorageContext } from '../context';
import styled from 'styled-components';

const Item = ({ id, name, price }) => (
  <p>${price} {name}</p>
);

const ItemList = ({ items }) =>
  items.map(i => <Item {...i} key={i.id} />)

export default () => {
  const { items } = useContext(StorageContext);

  return (
    <>
      <h1>Items ({ items.length })</h1>
      <ItemList items={items} />
    </>
  );
}
