import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {act, render, fireEvent} from '@testing-library/react';

import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';

import App from '../App';
import reducer from '../reducers';

const getConfiguredStore = preloadedState =>
	configureStore({
		middleware: getDefaultMiddleware => [...getDefaultMiddleware()],
		reducer,
		preloadedState
	});

// For cucumber APIs
export const pushBackButton = fn => {
	fn('User pushes back button on remote control.', () => {
		fireEvent.keyUp(window, {keyCode: 461});
	});
};

export const renderWithRedux = async (
	ui,
	{initialState = {}, floating = false}
) => {
	const store = getConfiguredStore(initialState);
	const FloatingLayer = FloatingLayerDecorator('div');
	let newUI = ui;
	if (floating) {
		newUI = <FloatingLayer>{ui}</FloatingLayer>;
	}
	let results;
	await act(async () => {
		results = await render(<Provider store={store}>{newUI}</Provider>);
	});
	return {...results, store};
};

const launch = (params = {}) => {
	return renderWithRedux(<App />, params);
};

export default launch;
