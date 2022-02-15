import {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';

import Button from '@enact/sandstone/Button';

import {openOptionMenu} from '../../reducers/general';
import {useOptionStrings} from '../../strings/option';

const OptionButton = props => {
	const dispatch = useDispatch();
	const strings = useOptionStrings();
	const handleOptionsClick = useCallback(() => {
		dispatch(openOptionMenu(true));
	}, [dispatch]);

	return (
		<Button
			{...props}
			aria-label={strings.options}
			size="small"
			icon="verticalellipsis"
			onClick={handleOptionsClick}
		/>
	);
};

export default memo(OptionButton);
