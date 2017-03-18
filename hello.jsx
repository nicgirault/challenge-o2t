import React from 'react';
import ReactDOM from 'react-dom';
import {getLastStockValues} from './src/stocks'

class Hello extends React.Component {
  componentDidMount() {
    getLastStockValues()
  }
  render() {
    return <h1>Hello</h1>
  }
}

ReactDOM.render(<Hello/>, document.getElementById('hello'));
