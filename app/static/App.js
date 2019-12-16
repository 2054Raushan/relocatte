import React, { useState } from 'react';
import { Icon, Menu, Layout } from "antd";
import { Link } from 'react-router-dom';
import './App.css';
import ContentRoute from './pages/ContentRoutes';
import routePaths from './shared/routePaths';
import logo from './images/relocatte_logo.png';


const { Header, Sider, Content } = Layout;



function App() {
  const [collapsed, setCollapsed] = useState(false);
    return (
          <Layout className="fix-app-height">
          <Header className="header">
            <div><img src={logo} className="logo" /></div>
            <Menu
              theme="dark"
              mode="horizontal"
              // defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => setCollapsed(!collapsed)}
              />
              <Menu theme="dark" mode="inline">
                <Menu.Item key="1">
                  <Link to={routePaths.ROOT}>
                  <Icon type="home" />
                  <span>Dashboard</span>
                  </Link> 
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={routePaths.PROPERTY}>
                  <Icon type="home" />
                  <span>Property</span>
                  </Link> 
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to={routePaths.OWNER}>
                  <Icon type="user" />
                  <span>Owners</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to={routePaths.TESTIMONIALS}>
                  <Icon type="wechat" />
                  <span>Testimonials</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to={routePaths.NOTIFICATION}>
                  <Icon type="bell" />
                  <span>Notification</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  background: '#fff',
                  minHeight: 280,
                }}
              >
                <ContentRoute />
              </Content>
            </Layout>
          </Layout>
        </Layout>
        
        );
      }
export default App;

