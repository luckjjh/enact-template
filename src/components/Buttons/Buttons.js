import {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import OptionButton from '../OptionButton';
import {openOptionMenu} from '../../reducers/general';
import {useOptionStrings} from '../../strings/option';

const Buttons = () => {
	const dispatch = useDispatch();
	const strings = useOptionStrings();
	const handleOptionsClick = useCallback(() => {
		dispatch(openOptionMenu(true));
	}, [dispatch]);

	return (
		<>
			<OptionButton aria-label={strings.options} onClick={handleOptionsClick} />
		</>
	);
};

export default memo(Buttons);
