import {useSelector} from 'react-redux';

import Alert from '@enact/sandstone/Alert';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';

import Buttons from '../../components/Buttons';
import Option from '../Option';

import {useNext, usePopup, useText} from './MainState';
import {useCommonStrings} from '../../strings/common';
import {useMainStrings} from '../../strings/main';

import css from './Main.module.less';

const Main = props => {
	const handleNext = useNext();
	const {isPopupOpen, handlePopupOpen, handlePopupClose} = usePopup();
	const common = useCommonStrings();
	const main = useMainStrings();

	const text = useText();
	const type = useSelector(state => state.config.type);

	return (
		<Panel {...props}>
			<Header title={common.title} slotAfter={<Buttons />} />
			<Option />
			<BodyText>{main.main}</BodyText>
			<BodyText>Text: {text}</BodyText>
			<BodyText>Type: {type}</BodyText>
			<Button onClick={handlePopupOpen} size="small" className={css.buttonCell}>
				{main.open}
			</Button>
			<Button onClick={handleNext} size="small" className={css.buttonCell}>
				{main.next}
			</Button>
			<Alert type="overlay" open={isPopupOpen} onClose={handlePopupClose}>
				<span>{main.alert}</span>
				<buttons>
					<Button
						size="small"
						className={css.buttonCell}
						onClick={handlePopupClose}
					>
						{main.ok}
					</Button>
				</buttons>
			</Alert>
		</Panel>
	);
};

export default Main;
