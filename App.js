import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

import Expo, { Constants } from 'expo';
import { StackNavigator } from 'react-navigation';
import getStartedScreen from './screen/getStarted.js';
import friendsScreen from './screen/friends.js';
import loggedInScreen from './screen/loggedIn.js';
import homeScreen from './screen/home.js';

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: homeScreen,
    },
    Start: {
      screen: getStartedScreen,
    },
    LoggedIn: {
      screen: loggedInScreen,
    },
    Friends: {
      screen: friendsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
