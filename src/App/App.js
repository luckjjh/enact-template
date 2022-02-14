import {useState} from 'react';
import {useSelector} from 'react-redux';

import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';

import Main from '../views/Main';
import Sub from '../views/Sub';
import {
	useBackHandler,
	useCloseHandler,
	useDocumentEvent,
	useLaunchParams,
	useSubscriptions
} from './AppState';
import {isDevServe} from '../libs/utils';

/* istanbul ignore next*/
if (isDevServe()) {
	window.webOSSystem = {
		highContrast: 'off',
		close: () => {},
		platformBack: () => {},
		PmLogString: () => {},
		screenOrientation: 'landscape',
		setWindowOrientation: () => {}
	};
}

const draw = panel => {
	switch (panel) {
		case 'main':
			return <Main key={panel} />;
		case 'sub':
			return <Sub key={panel} />;
		default:
			return <Main key={panel} />;
	}
};

const App = props => {
	const [skinVariants, setSkinVariants] = useState({highContrast: false});
	const panels = useSelector(state => state.panel.panels);
	const index = useSelector(state => state.panel.index);
	const parseLaunchParams = useLaunchParams();
	const handleBack = useBackHandler();
	const handleClose = useCloseHandler();
	useDocumentEvent(setSkinVariants, parseLaunchParams);
	useSubscriptions();

	return (
		<Panels
			{...props}
			skinVariants={skinVariants}
			data-testid="root"
			index={index}
			onBack={handleBack}
			onClose={handleClose}
		>
			{panels.map(draw)}
		</Panels>
	);
};

export default ThemeDecorator(App);
