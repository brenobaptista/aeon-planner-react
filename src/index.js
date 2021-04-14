import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faWindowClose, faPencilAlt, faCog } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import authReducer from './store/reducers/auth';
import taskReducer from './store/reducers/task';
import listReducer from './store/reducers/list';
import boardReducer from './store/reducers/board';

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  list: listReducer,
  board: boardReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

library.add(fab, faWindowClose, faPencilAlt, faCog);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
