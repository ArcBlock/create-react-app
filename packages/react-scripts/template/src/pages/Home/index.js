import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from '../../components/Layout';

import './style.css';

class Home extends Component {
  render() {
    return (
      <Layout>
        <p>OCAP React Starter</p>
      </Layout>
    );
  }
}

export default withRouter(Home);
