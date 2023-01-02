import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {on, off} from '@enact/core/dispatcher';

import * as domEvents from '../constants/domEvents';
import * as keyCode from '../constants/keyCode';
import debugLog from '../libs/log';
import {useConfigs} from '../hooks/configs';
import {closeApp, isTVBrowser, reload} from '../libs/utils';
import {
	openOptionMenu,
	setForeground,
	setLaunchParams
} from '../reducers/general';
import {popPanel} from '../reducers/panel';
import {useMemo} from 'react';
import {useOrientationInfo} from '../hooks/msc';

const useVisibleChangeHandler = () => {
	const dispatch = useDispatch();

	return useCallback(() => {
		const {hidden} = document;
		debugLog('VISIBILITY_CHANGE', {hidden});
		dispatch(setForeground(!hidden));
	}, [dispatch]);
};

const useRelaunchHandler = parseLaunchParams => {
	return useCallback(() => {
		debugLog('RELAUNCH', {});
		parseLaunchParams();
	}, [parseLaunchParams]);
};

const useLocaleChangeHandler = () => {
	return useCallback(() => {
		debugLog('LOCALE_CHANGE', {});
		reload();
	}, []);
};

const useKeyUpHandler = () => {
	const dispatch = useDispatch();

	return useCallback(
		e => {
			if (e.keyCode === keyCode.MORE_ACTION) {
				dispatch(openOptionMenu(true));
			}
		},
		[dispatch]
	);
};

const useHighContrastChangeHandler = () => {
	const [highContrast, setHighContrast] = useState(false);

	const handleHighContrastChange = useCallback(() => {
		if (isTVBrowser()) {
			debugLog('HIGH_CONTRAST_CHANGE', {});
			setHighContrast(window.webOSSystem.highContrast === 'on');
		}
	}, []);

	const skinVariants = useMemo(() => {
		return {highContrast};
	}, [highContrast]);

	useEffect(() => {
		handleHighContrastChange();
	}, [handleHighContrastChange]);

	return [skinVariants, handleHighContrastChange];
};

const useLaunchParams = () => {
	const dispatch = useDispatch();

	const parseLaunchParams = useCallback(() => {
		if (isTVBrowser()) {
			let {launchParams} = window.webOSSystem;

			if (!launchParams) {
				launchParams = '{}';
			}

			try {
				const parsed = JSON.parse(launchParams);
				debugLog('LAUNCH_PARAMS[S]', parsed);
				dispatch(setLaunchParams(parsed));
			} catch (e) {
				debugLog('LAUNCH_PARAMS[F]');
			}
		}
	}, [dispatch]);

	useEffect(() => {
		parseLaunchParams();
	}, [parseLaunchParams]);

	return parseLaunchParams;
};

export const useBackHandler = () => {
	const dispatch = useDispatch();

	return useCallback(() => {
		debugLog('BACK[I]', {});
		dispatch(popPanel());
	}, [dispatch]);
};

export const useCancelHandler = () => {
	return useCallback(() => {
		debugLog('CLOSE_BACK', {});
		closeApp(true);
	}, []);
};

export const useCloseHandler = () => {
	return useCallback(() => {
		debugLog('CLOSE_X[I]', {});
		closeApp();
	}, []);
};

// Add all document events here
export const useDocumentEvent = () => {
	const parseLaunchParams = useLaunchParams();
	const handleKeyup = useKeyUpHandler();
	const handleVisibilitychange = useVisibleChangeHandler();
	const handleLocaleChange = useLocaleChangeHandler();
	const [skinVariants, handleHighContrastChange] =
		useHighContrastChangeHandler();
	const handleRelaunch = useRelaunchHandler(parseLaunchParams);

	useEffect(() => {
		const events = {
			[domEvents.KEY_UP]: handleKeyup,
			[domEvents.VISIBILITY_CHANGE]: handleVisibilitychange,
			[domEvents.WEBOS_HIGH_CONTRAST_CHANGE]: handleHighContrastChange,
			[domEvents.WEBOS_LOCALE_CHANGE]: handleLocaleChange,
			[domEvents.WEBOS_RELAUNCH]: handleRelaunch
		};

		if (isTVBrowser()) {
			for (const event in events) {
				on(event, events[event], document);
			}
		}

		return () => {
			if (isTVBrowser()) {
				for (const event in events) {
					off(event, events[event], document);
				}
			}
		};
	}, [
		handleKeyup,
		handleVisibilitychange,
		handleHighContrastChange,
		handleLocaleChange,
		handleRelaunch
	]);

	return {skinVariants};
};

// Add functions to subscribe luna APIs for general usage here
export const useSubscriptions = () => {
	useConfigs();
	useOrientationInfo();
};
