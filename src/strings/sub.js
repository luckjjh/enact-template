import {useMemo} from 'react';
import $L from '@enact/i18n/$L';

export const useSubStrings = () => {
	return useMemo(() => {
		return {
			main: $L('This is a sub page of sample application.')
		};
	}, []);
};
