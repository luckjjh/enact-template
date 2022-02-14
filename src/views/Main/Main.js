import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';

import Buttons from '../../components/Buttons';
import Option from '../Option';

import debugLog from '../../libs/log';
import {useMainState} from './MainState';
import {useCommonStrings} from '../../strings/common';
import {useMainStrings} from '../../strings/main';

import css from './Main.module.less';
import {pushPanel} from '../../reducers/panel';

const Main = props => {
	const dispatch = useDispatch();
	const common = useCommonStrings();
	const main = useMainStrings();

	const text = useMainState();
	const type = useSelector(state => state.config.type);

	const handleNextClick = useCallback(() => {
		debugLog('CLICK_NEXT', {});
		dispatch(pushPanel('sub'));
	}, [dispatch]);

	return (
		<Panel {...props}>
			<Header title={common.title} slotAfter={<Buttons />} />
			<Option />
			<BodyText>{main.main}</BodyText>
			<BodyText>Text: {text}</BodyText>
			<BodyText>Type: {type}</BodyText>
			<Button onClick={handleNextClick} size="small" className={css.buttonCell}>
				{main.next}
			</Button>
		</Panel>
	);
};

export default Main;
