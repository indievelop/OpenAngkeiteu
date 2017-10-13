import React from 'react';
import ReactDOM from 'react-dom';
//redux
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

import {App} from 'containers'

const store = createStore(reducers, applyMiddleware(thunk));


const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, rootElement);
