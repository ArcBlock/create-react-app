import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Layout from '../../components/Layout';
import { dataSources, getClient } from '../../lib/ocap';

import './style.css';

class SubscriptionDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: dataSources[1],
      message: null,
      timestamp: null,
      subscribed: false,
    };

    console.log(getClient(this.state.dataSource.name));
  }

  async componentDidMount() {
    const client = getClient(this.state.dataSource.name);

    // Subscription
    const subscription = await client.newBlockMined();
    subscription.on('data', data => {
      this.setState({
        message: data,
        timestamp: new Date(),
      });

      setTimeout(() => {
        this.setState({ message: null });
      }, 2000);
    });

    this.setState({ subscribed: true });
  }

  render() {
    const { subscribed, message, timestamp, dataSource } = this.state;

    return (
      <Layout>
        <h2>Subscription Demo: ETH.newBlockMined</h2>
        {subscribed || <p>Try to subscribe to ETH.newBlockMined</p>}
        {subscribed && <p>ETH.newBlockMined subscription success</p>}
        {message && (
          <div className="App-json">
            <p>New ETH Blocked Mined at {timestamp}, detail as follows:</p>
            <pre>
              <code>{JSON.stringify(message, true, '  ')}</code>
            </pre>
          </div>
        )}

        <p className="alert">
          Open BROWSER CONSOLE to view methods provided by OCAPClient.
        </p>
      </Layout>
    );
  }
}

export default withRouter(SubscriptionDemo);
