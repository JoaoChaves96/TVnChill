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
import loginScreen from './screen/login.js';
import signUpScreen from './screen/signup.js';
import facebookLoginScreen from './screen/facebookLogin.js';
import searchFeed from './screen/searchFeed.js';
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDIrsjVU1pDbF8CKU8Mjc5Z3tMn-ApkbHg",
  authDomain: "tvnchill.firebaseapp.com",
  databaseURL: "https://tvnchill.firebaseio.com",
  projectId: "tvnchill",
  storageBucket: "tvnchill.appspot.com",
  messagingSenderId: "69000225904"
});

// const Trakt = require('trakt.tv');

// let options = {
//   client_id: <the_client_id>,
//   client_secret: <the_client_secret>,
//   redirect_uri: null,   // defaults to 'urn:ietf:wg:oauth:2.0:oob'
//   api_url: null,        // defaults to 'https://api.trakt.tv'
//   useragent: null,      // defaults to 'trakt.tv/<version>'
//   pagination: true      // defaults to false, global pagination (see below)
// };
// const trakt = new Trakt(options);





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
    Login: {
      screen: loginScreen,
    },
    SignUp: {
      screen: signUpScreen
    },
    FacebookLogin: {
      screen: facebookLoginScreen
    },
    SearchFeed : {
      screen : searchFeed
    }

  },
  {
    initialRouteName: 'SearchFeed',
    headerMode: 'none'
  }
);

