import request from '../libs/request';

const cfg = request('luna://com.webos.service.config');
export const getConfigs = params => cfg({method: 'getConfigs', ...params});

const sam = request('luna://com.webos.applicationManager');
export const launch = parameters => sam({method: 'launch', parameters});

const msc = request('luna://com.webos.service.msc');
export const getOrientationInfo = params =>
	msc({method: 'getOrientationInfo', ...params});
