import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';

export default () => (
  <Nav>
    <PageLink to='/' primary>List</PageLink>
    <PageLink to='/tags'>Tags</PageLink>
    <PageLink to='/items'>Items</PageLink>
    <PageLink to='/settings'>Settings</PageLink>
  </Nav>
);

const PageLink = styled(Link)`
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fcfcfc;
  border-top: 1px solid #f0f0f0;
`;
