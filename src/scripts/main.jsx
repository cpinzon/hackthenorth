import BabelPolyfill from 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';

const createApp = () => {
  return (
	  <App />
  );
}

render(createApp(), document.querySelector('#main'));
