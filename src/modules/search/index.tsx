import { ComponentClass } from 'react';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';

import SearchComponent from './search.component';
import reducer from './reducer';
import saga from './saga';

export default compose<ComponentClass>(
    injectReducer({ key: 'search', reducer }),
    injectSaga({ key: 'search', saga })
)(SearchComponent);
