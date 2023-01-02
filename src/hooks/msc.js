// This is subscribe APIs.

import {useEffect, useRef} from 'react';

import debugLog from '../libs/log';
import {getOrientationInfo} from '../libs/services';
import {isTVBrowser} from '../libs/utils';

export const useOrientationInfo = () => {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) {
			debugLog('GET_ORIENTATION_INFO[R]', {});
			ref.current = getOrientationInfo({
				parameters: {
					subscribe: true
				},
				onSuccess: res => {
					debugLog('GET_ORIENTATION_INFO[S]', res);
					if (isTVBrowser()) {
						window.webOSSystem.setWindowOrientation(
							res.orientation ?? 'landscape'
						);
					}
				},
				onFailure: err => {
					debugLog('GET_ORIENTATION_INFO[F]', err);
				}
			});
		}

		return () => {
			if (ref.current) {
				ref.current.cancel();
				ref.current = null;
			}
		};
	}, []);
};
