import React, { Component } from 'react';
import OCAPClient from '@arcblock/ocap-js';
import Layout from './components/Layout/';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.dataSources = [
      {
        name: 'btc',
        demoAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      },
      {
        name: 'eth',
        demoAddress: '0xe65d3128feafd14d472442608daf94bceb91e333',
      },
    ];

    this.clients = this.dataSources.reduce((obj, ds) => {
      obj[ds.name] = new OCAPClient({
        dataSource: ds.name,
        httpBaseUrl: 'http://47.104.23.85:8080/api', // for dev in china
        // httpBaseUrl: 'https://ocap.arcblock.io/api', // for production
        enableSubscription: true,
        enableMutation: false,
      });

      return obj;
    }, {});

    this.state = {
      dataSource: this.dataSources[0],
      summary: null,
      message: null,
      timestamp: null,
      loading: false,
    };

    console.log(this.getClient());
  }

  getClient() {
    return this.clients[this.state.dataSource.name];
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const client = this.getClient();

    const summary = await client.accountByAddress({
      address: this.state.dataSource.demoAddress,
    });

    // Subscription
    // const subscription = await client.newBlockMined();
    // subscription.on('data', data => {
    //   this.setState({
    //     message: data,
    //     timestamp: new Date(),
    //   });
    // });

    this.setState({ loading: false, summary });
  }

  render() {
    const { loading, summary, dataSource } = this.state;

    return (
      <Layout>
        <h2>Query Demo</h2>
        {loading && (
          <p>
            Loading account summary for {dataSource.name.toUpperCase()} account:{' '}
            {dataSource.demoAddress}
          </p>
        )}
        {loading || (
          <div className="App-json">
            <p>
              Account summary for {dataSource.name.toUpperCase()} account:{' '}
              {dataSource.demoAddress}
            </p>
            <pre>
              <code>{JSON.stringify(summary, true, '  ')}</code>
            </pre>
          </div>
        )}

        <h2>Building your own DApp</h2>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="alert">
          Open BROWSER CONSOLE to view methods provided by OCAPClient.
        </p>
      </Layout>
    );
  }
}

export default App;
