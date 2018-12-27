import React from 'react';
// import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';
import { store } from '../index';
// const initialState = {};
// const store = configureStore(initialState, history);

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => WrappedComponent => {
  // console.log(this.context.store, 'this.context.store')
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    // static contextTypes = {
    //   store: PropTypes.object.isRequired,
    // };

    static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentWillMount() {
      const { injectReducer } = this.injectors;
      injectReducer(key, reducer);
    }

    // injectors = getInjectors(this.context.store);
    injectors = getInjectors(store);

    render() {
      // console.log(store, 'this.context.store')
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
