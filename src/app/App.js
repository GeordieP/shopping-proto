import React from 'react';
import { Router } from '@reach/router';

// global styles
import 'normalize.css';
import './css/global.css';
import './css/layout.css';

// components
import NavBar from './components/NavBar';

// pages
const List = () => ( <h1>List Page</h1> );
const Tags = () => ( <h1>Tags Page</h1> );
const Items = () => ( <h1>Items Page</h1> );
const Settings = () => ( <h1>Settings Page</h1> );

export default () => {
  return (
    <main>
      <Router id='content'>
        <List path='/' />
        <Tags path='/tags' />
        <Items path='/items' />
        <Settings path='/settings' />
      </Router>

      <NavBar />
    </main>
  );
}
