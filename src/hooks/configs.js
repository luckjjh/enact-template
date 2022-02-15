// This is subscribe APIs.

import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';

import debugLog from '../libs/log';
import {getConfigs} from '../libs/services';
import {setType} from '../reducers/config';

export const useConfigs = () => {
	const ref = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!ref.current) {
			debugLog('GET_CONFIGS[R]', {});
			ref.current = getConfigs({
				parameters: {
					subscribe: true,
					configNames: ['com.webos.service.rollingscreen.supportScreenType']
				},
				onSuccess: res => {
					debugLog('GET_CONFIGS[S]', res);
					if (res.configs) {
						dispatch(
							setType(
								res.configs['com.webos.service.rollingscreen.supportScreenType']
							)
						);
					}
				},
				onFailure: err => {
					debugLog('GET_CONFIGS[F]', err);
				}
			});
		}

		return () => {
			if (ref.current) {
				ref.current.cancel();
				ref.current = null;
			}
		};
	}, [dispatch]);
};
