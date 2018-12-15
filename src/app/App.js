import React from 'react';
import { Router } from '@reach/router';

// global styles
import 'normalize.css';
import './css/global.css';
import './css/layout.css';

// reach ui styles
// https://ui.reach.tech/styling#including-base-styles
import '@reach/dialog/styles.css';

// components
import NavBar from './components/NavBar';

// views
import MainListView from './views/MainListView';
import TagsListView from './views/TagsListView';
import ItemsListView from './views/ItemsListView';
import SettingsView from './views/SettingsView';

export default () => {
  return (
    <main>
      <Router id='content'>
        <MainListView path='/' />
        <TagsListView path='/tags' />
        <ItemsListView path='/items' />
        <SettingsView path='/settings' />
      </Router>

      <NavBar />
    </main>
  );
}
