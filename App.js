/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppContainer from './app/router/index';

export default class App extends Component {
  render() {
    return (
      <AppContainer onNavigationStateChange={this.handleNavigationChange} />
    );
  }
}
