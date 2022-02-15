// This is bundle of states of Main.js

import {useCallback, useMemo, useState} from 'react';

export const useText = () => {
	return useMemo(() => {
		return 'ABC';
	}, []);
};

export const usePopup = () => {
	const [isPopupOpen, openPopup] = useState(false);

	const handlePopupOpen = useCallback(() => {
		openPopup(true);
	}, []);

	const handlePopupClose = useCallback(() => {
		openPopup(false);
	}, []);

	return {isPopupOpen, handlePopupOpen, handlePopupClose};
};
