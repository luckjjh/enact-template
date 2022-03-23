import {useSelector} from 'react-redux';

import Cancelable from '@enact/ui/Cancelable';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import Panels from '@enact/sandstone/Panels';

import Main from '../views/Main';
import Sub from '../views/Sub';
import {
	useBackHandler,
	useCancelHandler,
	useCloseHandler,
	useDocumentEvent,
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
		case 'sub':
			return <Sub key={panel} />;
	}
};

const App = props => {
	const panels = useSelector(state => state.panel.panels);
	const index = useSelector(state => state.panel.index);
	const {skinVariants} = useDocumentEvent();
	const handleBack = useBackHandler();
	const handleCancel = useCancelHandler();
	const handleClose = useCloseHandler();
	useSubscriptions();

	return (
		<CancelablePanels
			{...props}
			noAnimation={process.env.NODE_ENV === 'test'}
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
