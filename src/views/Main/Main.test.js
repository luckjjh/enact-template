import {fireEvent, screen} from '@testing-library/react';
import {defineFeature, loadFeature} from 'jest-cucumber';

import launch, {pushBackButton} from '../../libs/testutils';

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
		when('Main page is launched.', async () => {
			await launch();
		});
		then('The page shows texts well.', () => {
			let item = screen.queryByText(/ABC/);
			expect(item).not.toBeNull();
			item = screen.queryByText(/main/);
			expect(item).not.toBeNull();
		});
	});

	run('Open alert', ({when, then, and}) => {
		when('User clicks OK button.', async () => {
			await launch();
			const ok = screen.queryByText(/ok/i);
			fireEvent.click(ok);
		});
		then('The alert is shown.', async () => {
			const message = await screen.findByText(/alert message/i);
			expect(message).not.toBeNull();
		});
		and('User clicks any button.', async () => {
			const [, ok] = await screen.findAllByText(/ok/i);
			fireEvent.click(ok);
		});
		then('The alert disappears.', () => {
			const message = screen.queryByText(/alert message/i);
			expect(message).toBeNull();
		});
	});

	run('Open option menu', ({when, then, and}) => {
		when('User clicks Options button.', async () => {
			await launch();
			const option = screen.queryByLabelText(/options/i);
			fireEvent.click(option);
		});
		then('The menu is shown.', async () => {
			const option = await screen.findByText(/option/i);
			expect(option).not.toBeNull();
		});
		pushBackButton(and);
		then('The menu disappears.', () => {
			const option = screen.queryByText(/option/i);
			expect(option).toBeNull();
		});
	});
});
