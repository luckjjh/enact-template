import {useState} from 'react';
import {useSelector} from 'react-redux';

import Cancelable from '@enact/ui/Cancelable';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';

import Main from '../views/Main';
import {
	useBackHandler,
	useCancelHandler,
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

const CancelablePanels = Cancelable(
	{modal: 'true', onCancel: 'onCancel'},
	Panels
);

const draw = panel => {
	switch (panel) {
		case 'main':
			return <Main key={panel} />;
	}
};

const App = props => {
	const [skinVariants, setSkinVariants] = useState({highContrast: false});
	const panels = useSelector(state => state.panel.panels);
	const index = useSelector(state => state.panel.index);
	const parseLaunchParams = useLaunchParams();
	const handleBack = useBackHandler();
	const handleCancel = useCancelHandler();
	const handleClose = useCloseHandler();
	useDocumentEvent(setSkinVariants, parseLaunchParams);
	useSubscriptions();

	return (
		<CancelablePanels
			{...props}
			skinVariants={skinVariants}
			data-testid="root"
			index={index}
			onBack={handleBack}
			onCancel={handleCancel}
			onClose={handleClose}
		>
			{panels.map(draw)}
		</CancelablePanels>
	);
};

export default ThemeDecorator(App);
