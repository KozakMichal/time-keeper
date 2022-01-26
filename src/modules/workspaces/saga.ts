import { takeLatest, call, put } from '@redux-saga/core/effects';
import * as localforage  from 'localforage';
import { Await } from '../../utils/await.type';
import { createWorkspace, createWorkspaceDone, fetchWorkspacesDone } from './actions';
import * as constants from './constants';
import { WorkspaceModel } from './workspace.model';
import { v4 } from 'uuid';

function* handleFetch() {
    const workspaces: Await<WorkspaceModel[]> = yield call(
        [localforage, 'getItem'],
        constants.WORKSPACES_STORAGE_KEY
    );

    yield put(
        fetchWorkspacesDone(workspaces)
    );
}

function* handleCreateWorkspace(action: ReturnType<typeof createWorkspace>) {
    let currentWorkspaces: Await<WorkspaceModel[]> = yield call(
        [localforage, 'getItem'],
        constants.WORKSPACES_STORAGE_KEY
    );

    if (!currentWorkspaces) {
        currentWorkspaces = [];
    }

    const newWorkspace = {
        ...action.payload.workspace,
        id: v4(),
    };

    yield call(
        [localforage, 'setItem'],
        constants.WORKSPACES_STORAGE_KEY,
        [
            ...currentWorkspaces,
            newWorkspace,
        ]
    );

    yield put(
        createWorkspaceDone(newWorkspace)
    );
}

function* actionWatcher() {
    yield takeLatest(constants.FETCH_WORKSPACES, handleFetch);
    yield takeLatest(constants.CREATE_WORKSPACES, handleCreateWorkspace);
};

export default actionWatcher;
