import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';

export default () => (
  <Nav>
    <Link to='/'>List</Link>
    <Link to='/tags'>Tags</Link>
    <Link to='/items'>Items</Link>
    <Link to='/settings'>Settings</Link>
  </Nav>
);

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fcfcfc;
  border-top: 1px solid #f0f0f0;
`;
