import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import Page from './page'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createStore,applyMiddleware } from 'redux'
import {setbook} from './views/redux/addBooks'
let store=createStore(setbook,applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}>
<Page />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
