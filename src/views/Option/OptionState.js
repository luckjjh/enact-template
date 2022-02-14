import {useCallback} from 'react';

import {useLaunch} from '../../hooks/sam';

export const useLaunchUserGuide = () => {
	const launch = useLaunch();

	return useCallback(() => {
		launch({
			id: 'com.webos.app.tvuserguide',
			params: {target: 'smarttv', target2: 'tutorial'}
		});
	}, [launch]);
};
