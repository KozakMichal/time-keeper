import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import history from '../history';

import Workspaces from '../modules/workspaces';
import Tickets from '../modules/tickets';
import { Alert } from '@mui/material';

export const router = () => (
    <ConnectedRouter history={history()}>
        <Switch>
            <Route path="/" exact component={Workspaces} />
            <Route path="/workspace/:workspaceId" exact component={Tickets} />

            <Route path="*">
                <Alert severity="warning">
                    Page not found!
                </Alert>
            </Route>
        </Switch>
    </ConnectedRouter>
);
