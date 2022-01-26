import { createBrowserHistory } from 'history';

let history: any;

const getBrowserHistory = () => {
    if (!history) {
        history = createBrowserHistory({
            basename: process.env.PUBLIC_URL,
        });
    }

    return history;
};

export default getBrowserHistory;
