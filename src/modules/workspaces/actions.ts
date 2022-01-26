import * as constants from './constants';
import { WorkspaceModel } from './workspace.model';

export const fetchWorkspaces = () => ({
    type: constants.FETCH_WORKSPACES,
    payload: {}
});

export const fetchWorkspacesDone = (workspaces: WorkspaceModel[] = []) => ({
    type: constants.FETCH_WORKSPACES_DONE,
    payload: {
        workspaces,
    },
});

export const createWorkspace = (workspace: WorkspaceModel) => ({
    type: constants.CREATE_WORKSPACES,
    payload: {
        workspace,
    },
});

export const createWorkspaceDone = (workspace: WorkspaceModel) => ({
    type: constants.CREATE_WORKSPACES_DONE,
    payload: {
        workspace,
    },
});
