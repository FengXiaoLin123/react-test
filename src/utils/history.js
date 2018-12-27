import createHistory from 'history/createHashHistory';

const history = createHistory();

const goBack = () => {
  history.goBack();
};

const goForward = () => {
  history.goForward();
};

const gotoRoute = (route) => {
  history.push(route);
};

const gotoPath = (path, state) => {
  history.push({
    pathname: path,
    search: state,
  });
};

const gotoHref = (href) => {
  window.open(href);
};

export {
  goBack, goForward, gotoRoute, gotoPath, gotoHref, history,
};

export default history;
