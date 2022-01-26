import { createBrowserHistory } from 'history';

let history: any;

const getBrowserHistory = () => {
    if (!history) {
        history = createBrowserHistory({});
    }

    return history;
};

export default getBrowserHistory;
