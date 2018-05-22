import React, { Component } from 'react';

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
import axios from 'axios';
import Expo from "expo";

const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

  console.log(api)

  let request = 'http://' + api + '/movies/getImage/' + '20526';

axios.get(request)
  .then(function (response) {
     //console.log(response); 
  })
  .catch(function (error) {
    console.log(error);
  });

firebase.initializeApp({
  apiKey: "AIzaSyDIrsjVU1pDbF8CKU8Mjc5Z3tMn-ApkbHg",
  authDomain: "tvnchill.firebaseapp.com",
  databaseURL: "https://tvnchill.firebaseio.com",
  projectId: "tvnchill",
  storageBucket: "tvnchill.appspot.com",
  messagingSenderId: "69000225904"
});






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
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

