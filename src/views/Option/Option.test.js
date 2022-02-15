import {fireEvent, screen} from '@testing-library/react';
import {defineFeature, loadFeature} from 'jest-cucumber';

import * as services from '../../libs/services';
import launch from '../../libs/testutils';

const feature = loadFeature('./src/views/Option/Option.feature');

beforeEach(() => {
	window.webOSSystem = {
		PmLogString: jest.fn(),
		close: jest.fn(),
		setWindowOrientation: jest.fn()
	};
});

defineFeature(feature, run => {
	run('Launch User Guide', ({when, then}) => {
		let spy;
		when('User clicks User Guide in menu.', async () => {
			spy = jest.spyOn(services, 'launch');
			await launch();
			const option = screen.queryByLabelText(/options/i);
			fireEvent.click(option);
			const userGuide = screen.queryByText(/user guide/i);
			fireEvent.click(userGuide);
		});
		then('User Guide is launched.', () => {
			expect(spy).toBeCalledWith({
				id: 'com.webos.app.tvuserguide',
				params: {target: 'smarttv', target2: 'tutorial'}
			});
			spy.mockRestore();
		});
	});

	run('Quit the application', ({when, then}) => {
		when('User clicks Quit App in menu.', async () => {
			await launch();
			const option = screen.queryByLabelText(/options/i);
			fireEvent.click(option);
			const quit = screen.queryByText(/quit app/i);
			fireEvent.click(quit);
		});
		then('The app is closed.', () => {
			expect(window.webOSSystem.close).toBeCalled();
		});
	});
});
