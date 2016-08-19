import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './app/routes';

import { Provider } from 'react-redux';
import configureStore from './app/stores/configureStore';


const store = configureStore();
console.log('store: ',store);

let handleCreateElement = (Component, props) => {
	return <Component {...props} />
}
render((
	<Provider store={store}>
		<Router history={browserHistory} createElement={handleCreateElement}>{routes}</Router>
	</Provider>
), document.getElementById('root'));