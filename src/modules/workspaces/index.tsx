import { ComponentClass } from 'react';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';

import PageComponent from './page.component';
import reducer from './reducer';
import saga from './saga';

export default compose<ComponentClass>(
    injectReducer({ key: 'workspaces', reducer }),
    injectSaga({ key: 'workspaces', saga })
)(PageComponent);
