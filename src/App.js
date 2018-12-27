/**
 *  App入口
 */
import { Route, Switch, Redirect } from 'react-router';
import React, { lazy, Suspense } from 'react';
import { Layout } from 'antd';
import PageLoading from 'appRoot/common/PageLoading';
import loadable from 'loadable-components';
// import UpdateReduxContainers from 'containers/UpdateReduxContainers';

import './statics/less/style.less';

const Login = loadable(() => import('./components/user/Login'), {
  LoadingComponent: PageLoading,
});

const HeaderWrap = loadable(() => import('./common/HeaderWrap'), {
  LoadingComponent: PageLoading,
});

const FooterWrap = loadable(() => import('./common/FooterWrap'), {
  LoadingComponent: PageLoading,
});

const Home = () => {
  // eslint-disable-next-line no-unused-expressions
  return <div style={{ height: 300 }}>132465</div>;
};

const Funds = () => {
  // eslint-disable-next-line no-unused-expressions
  return <div style={{ height: 300 }}>Funds</div>;
};

const PublicRoute = ({ component: Component, header: Header, footer: Footer, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout className="rt-layout-wrap">
        <Header />
        <div className="rt-body-wrap">
          <Component {...props} />
        </div>
        <Footer />
      </Layout>
    )}
  />
);

export default function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <PublicRoute exact path="/" header={HeaderWrap} component={Home} footer={FooterWrap} />
        <PublicRoute exact path="/funds" header={HeaderWrap} component={Funds} footer={FooterWrap} />
        <Route exact path="/login" component={Login} />
      </Switch>
      {/* <UpdateReduxContainers> */}
      {/* </UpdateReduxContainers> */}
    </Suspense>
  );
}
