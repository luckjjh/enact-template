import {screen} from '@testing-library/react';
import {defineFeature, loadFeature} from 'jest-cucumber';

import launch from '../../libs/testutils';

const feature = loadFeature('./src/views/Main/Main.feature');

beforeEach(() => {
	window.webOSSystem = {
		PmLogString: jest.fn(),
		close: jest.fn(),
		setWindowOrientation: jest.fn()
	};
});

defineFeature(feature, run => {
	run('Launch the app', ({when, then}) => {
		when('The app is launched', async () => {
			await launch();
		});
		then('App shows texts', () => {
			let item = screen.queryByText(/Enact Template/);
			expect(item).not.toBeNull();
			item = screen.queryByText(/sub/);
			expect(item).not.toBeNull();
		});
	});
});
