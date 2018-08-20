import React, { Component } from 'react';
import OCAPClient from '@arcblock/ocap-js';
import Layout from './components/Layout/';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      summary: null,
      loading: false,
    };

    this.client = new OCAPClient({
      dataSource: 'btc',
      httpBaseUrl: 'http://47.104.23.85:8080/api', // for dev in china
      // httpBaseUrl: 'https://ocap.arcblock.io/api', // for production
      enableSubscription: false,
      enableMutation: false,
    });
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const summary = await this.client.accountByAddress({
      address: this.state.address,
    });

    this.setState({ loading: false, summary });
  }

  render() {
    const { loading, summary, address } = this.state;

    return (
      <Layout>
        <h2>OCAP Data Fetching Demo</h2>
        {loading && (
          <p>Loading account summary for Bitcoin Address: {address}</p>
        )}
        {loading || (
          <div className="App-json">
            <p>Account summary for Bitcoin account: {address}</p>
            <pre>
              <code>{JSON.stringify(summary, true, '  ')}</code>
            </pre>
          </div>
        )}
        <h2>Building your own DApp</h2>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </Layout>
    );
  }
}

export default App;
