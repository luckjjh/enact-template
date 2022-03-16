import BodyText from '@enact/sandstone/BodyText';
import {Header, Panel} from '@enact/sandstone/Panels';

import Option from '../Option';
import Buttons from '../../components/Buttons';
import {useCommonStrings} from '../../strings/common';
import {useSubStrings} from '../../strings/sub';

const Sub = props => {
	const common = useCommonStrings();
	const sub = useSubStrings();

	return (
		<Panel {...props}>
			<Header title={common.title} slotAfter={<Buttons />} />
			<Option />
			<BodyText>{sub.main}</BodyText>
		</Panel>
	);
};

export default Sub;
