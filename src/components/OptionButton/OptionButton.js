import {memo} from 'react';

import Button from '@enact/sandstone/Button';

const OptionButton = props => {
	return <Button {...props} size="small" icon="verticalellipsis" />;
};

export default memo(OptionButton);
