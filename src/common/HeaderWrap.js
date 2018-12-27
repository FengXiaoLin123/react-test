import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { gotoPath } from 'utils/history';

const { Header } = Layout;

const headerLogo = require('statics/images/logo.png');

class HeaderWrap extends React.PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <Header className="rt-common-header-wrap" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="rt-common-header">
          <div className="-header-left">
            <div className="-logo">
              <img src={headerLogo} alt="logo" />
            </div>
            <Menu
              className="rt-menu-horizontal"
              onClick={this.handleClick}
              mode="horizontal"
            >
              <Menu.Item key="1">
                <Link
                  to="/"
                >
                  Trade
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link
                  to="/funds"
                >
                  Funds
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link
                  to="/funds"
                >
                  History
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link
                  to="/funds"
                >
                  News
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="-header-right">
            <Button
              className="rt-common-btn"
              onClick={() => {
                gotoPath('/login');
              }}
            >
              Login
            </Button>
            <Button className="rt-common-btn rt-margin-left17">Sign up</Button>
          </div>
        </div>
      </Header>
    );
  }
}

export default HeaderWrap;
