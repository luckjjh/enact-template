import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';

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

const useVisibleChangeHandler = () => {
	const dispatch = useDispatch();

	return useCallback(() => {
		const {hidden} = document;
		debugLog('VISIBILITY_CHANGE', {hidden});
		dispatch(setForeground(!hidden));
	}, [dispatch]);
};

const useScreenOrientationChangeHandler = () => {
	useEffect(() => {
		if (isTVBrowser()) {
			window.webOSSystem.setWindowOrientation(
				window.webOSSystem.screenOrientation ?? 'landscape'
			);
		}
	}, []);

	return useCallback(e => {
		const orientation = e.detail.screenOrientation ?? 'landscape';
		debugLog('ORIENTATION_CHANGE', {orientation});
		window.webOSSystem.setWindowOrientation(orientation);
	}, []);
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

const useHighContrastChangeHandler = setSkinVariants => {
	return useCallback(() => {
		debugLog('HIGH_CONTRAST_CHANGE', {});
		setSkinVariants({
			highContrast: window.webOSSystem.highContrast === 'on'
		});
	}, [setSkinVariants]);
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

export const useBackHandler = () => {
	const dispatch = useDispatch();

	return useCallback(() => {
		debugLog('BACK[I]', {});
		dispatch(popPanel());
	}, [dispatch]);
};

export const useCloseHandler = () => {
	return useCallback(() => {
		debugLog('CLOSE_X[I]', {});
		closeApp();
	}, []);
};

// Add all document events here
export const useDocumentEvent = (setSkinVariants, parseLaunchParams) => {
	// Variables should be exactly same names as document events
	const keyup = useKeyUpHandler();
	const screenOrientationChange = useScreenOrientationChangeHandler();
	const visibilitychange = useVisibleChangeHandler();
	const webOSHighContrastChange = useHighContrastChangeHandler(setSkinVariants);
	const webOSLocaleChange = useLocaleChangeHandler();
	const webOSRelaunch = useRelaunchHandler(parseLaunchParams);

	useEffect(() => {
		const events = {
			keyup,
			screenOrientationChange,
			visibilitychange,
			webOSHighContrastChange,
			webOSLocaleChange,
			webOSRelaunch
		};

		if (isTVBrowser()) {
			for (const event in events) {
				document.addEventListener(event, events[event]);
			}
		}

		return () => {
			if (isTVBrowser()) {
				for (const event in events) {
					document.removeEventListener(event, events[event]);
				}
			}
		};
	}, [
		keyup,
		screenOrientationChange,
		visibilitychange,
		webOSHighContrastChange,
		webOSLocaleChange,
		webOSRelaunch
	]);
};

export const useLaunchParams = () => {
	const dispatch = useDispatch();

	const parseLaunchParams = useCallback(() => {
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
	}, [dispatch]);

	useEffect(() => {
		if (isTVBrowser) {
			parseLaunchParams();
		}
	}, [parseLaunchParams]);

	return parseLaunchParams;
};

// Add functions to subscribe luna APIs for general usage here
export const useSubscriptions = () => {
	useConfigs();
};
