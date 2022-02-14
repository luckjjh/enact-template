import {combineReducers} from 'redux';

import general from './general';
import config from './config';
import panel from './panel';

export default combineReducers({
	general,
	config,
	panel
});
