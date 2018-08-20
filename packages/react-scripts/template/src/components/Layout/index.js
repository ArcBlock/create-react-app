import React from 'react';
import logo from './logo.png';
import './layout.css';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-links">
            <AppLink
              href="https://ocap.arcblock.io"
              title="SDK Documentation"
            />
            <AppLink href="https://ocap.arcblock.io" title="Go Playground" />
            <AppLink href="https://reactjs.org" title="Learn React" />
          </div>
        </header>
        <div className="App-content">{this.props.children}</div>
      </div>
    );
  }
}

const AppLink = ({ href, title }) => (
  <a className="App-link" href={href} target="_blank" rel="noopener noreferrer">
    {title}
  </a>
);
