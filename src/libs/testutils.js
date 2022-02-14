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

export const renderWithRedux = async (
	ui,
	{
		initialState = {},
		store = getConfiguredStore(initialState),
		floating = false
	} = {}
) => {
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

export const launch = (floating = false) => {
	return renderWithRedux(<App />, {floating});
};

// For cucumber APIs
export const pushBackButton = fn => {
	fn('User pushes back button on remote control', () => {
		fireEvent.keyUp(window, {keyCode: 461});
	});
};

export default launch;
