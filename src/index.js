import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import App from './App/App';
import reducer from './reducers';
import {isBrowser} from './libs/utils';

const store = configureStore({
	reducer,
	middleware: getMiddleware => {
		const middleware = getMiddleware();
		if (process.env.NODE_ENV === 'development') {
			middleware.push(require('redux-logger').logger);
		}
		return middleware;
	}
});

let appElement = (
	<Provider store={store}>
		<App highContrast />
	</Provider>
);

if (isBrowser()) {
	const root = createRoot(document.getElementById('root'));
	root.render(appElement);
	appElement = null;
}

export default appElement;
