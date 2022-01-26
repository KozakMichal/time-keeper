import { createWorkspaceDone, fetchWorkspacesDone } from './actions';
import * as constants from './constants';
import { WorkspaceModel } from './workspace.model';

export interface WorkspacesReducerState {
    workspaces: WorkspaceModel[];
};

const getInitialState = () => ({
    workspaces: [],
});

const WorkspacesReducer = (
    state = getInitialState(),
    action: any
): WorkspacesReducerState => {
    switch (action.type) {
        case constants.FETCH_WORKSPACES_DONE:
            return {
                ...state,
                workspaces: (action as ReturnType<typeof fetchWorkspacesDone>).payload.workspaces || [],
            };
        case constants.CREATE_WORKSPACES_DONE:
            return {
                ...state,
                workspaces: [
                    ...state.workspaces,
                    (action as ReturnType<typeof createWorkspaceDone>).payload.workspace,
                ],
            };
        default:
            return state;
    }
};

export default WorkspacesReducer;
