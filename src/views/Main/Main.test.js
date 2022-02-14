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
	run('Launch main page', ({when, then}) => {
		when('Main page is launched', async () => {
			await launch();
		});
		then('The page shows texts well', () => {
			let item = screen.queryByText(/Enact Template/);
			expect(item).not.toBeNull();
			item = screen.queryByText(/ABC/);
			expect(item).not.toBeNull();
		});
	});
});
