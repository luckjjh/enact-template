// This is bundle of states of Main.js

import {useMemo} from 'react';

export const useMainState = () => {
	return useMemo(() => {
		return 'ABC';
	}, []);
};
