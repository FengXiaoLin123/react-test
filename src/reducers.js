/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import history from 'utils/history';

// import { CLEAR_STATE } from './socketConstants';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const appReducer = combineReducers({
    language: languageProviderReducer,
    ...injectedReducers,
    router: connectRouter(history),
  });

  const rootReducer = (state, action) => {
    // console.log(state, 'rootReducer.state');

    // if (action.type === CLEAR_STATE) {
    //   state = undefined;
    // }
    // console.log(state,'rootReducer.state')

    return appReducer(state, action);
  };

  // Wrap the root reducer and return a new root reducer with router state
  // const mergeWithRouterState = connectRouter(history);
  // console.log(mergeWithRouterState, 'mergeWithRouterState')
  // return mergeWithRouterState(rootReducer);
  return rootReducer;
}
