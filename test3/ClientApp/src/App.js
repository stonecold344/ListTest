import React, { Component } from 'react';
import { Route } from 'react-router';
import  ListHome  from './components/ListHome';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Route path="/" component={ListHome}/>
    );
  }
}
