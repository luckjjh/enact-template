import {fireEvent, screen} from '@testing-library/react';
import {defineFeature, loadFeature} from 'jest-cucumber';

import launch, {displayPageWell, pushBackButton} from '../../libs/testutils';

const feature = loadFeature('./src/views/Sub/Sub.feature');

beforeEach(() => {
	window.webOSSystem = {
		PmLogString: jest.fn(),
		close: jest.fn(),
		setWindowOrientation: jest.fn()
	};
});

defineFeature(feature, run => {
	run('Launch sub page', ({given, when, then}) => {
		given('Main page is launched.', async () => {
			await launch();
		});

		when('User clicks Next button.', () => {
			const item = screen.queryByText(/next/i);
			fireEvent.click(item);
		});

		displayPageWell(then, 'sub', expect);
	});

	run('Go back to main with back icon', ({given, when, then}) => {
		given('Sub page is launched.', async () => {
			await launch();
			const item = screen.queryByText(/next/i);
			fireEvent.click(item);
		});

		when('User clicks return icon.', () => {
			const item = screen.queryByLabelText('go to previous');
			fireEvent.click(item);
		});

		displayPageWell(then, 'main', expect);
	});

	run('Go back to main with back button', ({given, when, then}) => {
		given('Sub page is launched.', async () => {
			await launch();
			const item = screen.queryByText(/next/i);
			fireEvent.click(item);
		});

		pushBackButton(when);

		displayPageWell(then, 'main', expect);
	});
});
