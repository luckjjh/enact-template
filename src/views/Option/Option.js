import {memo, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import FixedPopupPanels, {
	Header,
	Panel
} from '@enact/sandstone/FixedPopupPanels';
import Item from '@enact/sandstone/Item';

import {useLaunchUserGuide} from './OptionState';
import {openOptionMenu} from '../../reducers/general';
import {useOptionStrings} from '../../strings/option';
import debugLog from '../../libs/log';
import {closeApp} from '../../libs/utils';

const Option = () => {
	const dispatch = useDispatch();
	const isOptionMenuOpen = useSelector(state => state.general.isOptionMenuOpen);
	const strings = useOptionStrings();
	const launchUserGuide = useLaunchUserGuide();

	const handleClose = useCallback(() => {
		dispatch(openOptionMenu(false));
	}, [dispatch]);

	const handleUserGuideClick = useCallback(() => {
		launchUserGuide();
	}, [launchUserGuide]);

	const handleQuitClick = useCallback(() => {
		debugLog('QUIT', {});
		closeApp();
	}, []);

	return (
		<FixedPopupPanels open={isOptionMenuOpen} onClose={handleClose}>
			<Panel>
				<Header title={strings.options} />
				<Item key={strings.options} onClick={handleUserGuideClick}>
					{strings.userguide}
				</Item>
				<Item key={strings.quit} onClick={handleQuitClick}>
					{strings.quit}
				</Item>
			</Panel>
		</FixedPopupPanels>
	);
};

export default memo(Option);
