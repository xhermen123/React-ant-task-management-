import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidebar from './components/Sidebar'
import Dashboard from './screens/Dashboard'
import CreateEventGallery from './screens/CreateEventGallery';
import EventGalleries from './screens/EventGalleries';
import EventGalleryDetails from './screens/EventGalleryDetails';
import Venue from './containers/venue';
import { Provider } from 'react-redux';
import configureStore from './store';


export const store = configureStore();

import {
  Layout
} from 'antd';

const { Content, Header, Footer } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Router>
        <Layout>
          <Sidebar trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              />
          <Layout style={{ marginLeft: 240 }}>
            <Header  style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', padding: 0 }}/>
            <Content style={{ margin: '88px 16px 0', overflow: 'initial', minHeight: 'calc(100vh - 157px)' }}>
              <Provider store={store}>
                <Switch>
                  <Route exact path="/event-gallery/new" component={CreateEventGallery} />
                  <Route exact path="/event-galleries" component={EventGalleries} />
                  <Route exact path="/event-gallery/:id" component={EventGalleryDetails} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/venue/new" component={Venue} />
                </Switch>
              </Provider>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Venue Genie ©2019 Created by Threeaccents
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
