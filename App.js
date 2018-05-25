import React, { Component } from 'react';
import {Image, StyleSheet} from 'react-native';

import { StackNavigator } from 'react-navigation';
import getStartedScreen from './screen/getStarted.js';
import friendsScreen from './screen/friends.js';
import loggedInScreen from './screen/loggedIn.js';
import homeScreen from './screen/home.js';
import loginScreen from './screen/login.js';
import signUpScreen from './screen/signup.js';
import facebookLoginScreen from './screen/facebookLogin.js';
import * as firebase from 'firebase';
import axios from 'axios';
import Expo from "expo";
import {DrawerNavigator, DrawerItems} from 'react-navigation';
import FeedScreen from './screen/FeedScreen.js';
import SeenScreen from './screen/SeenScreen.js';
import WishlistScreen from './screen/WishlistScreen.js';
import ProfileScreen from './screen/ProfileScreen.js';
import FacebookScreen from './screen/FacebookScreen.js';
import ResultScreen from './screen/ResultScreen.js';

import{Container, Header, Body, Content} from 'native-base';

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
    return <RootStack/>;
  }
}

const DrawerComponent = (props) => (
    <Container>
        <Header style={{height:200, backgroundColor: '#119da4'}}>
            <Body>
            <Image style={styles.drawerImage}
                   source={require('./img/logo.png')}/>

            </Body>
        </Header>
        <Content>
            <DrawerItems {...props} activeTintColor='#119da4' inactiveTintColor='#455561'/>
        </Content>
    </Container>
)

const Drawer = DrawerNavigator({
        Feed: {
            screen: FeedScreen,
        },
        Seen: {
            screen: SeenScreen,
        },
        Wishlist: {
            screen: WishlistScreen,
        },
        Profile : {
            screen: ProfileScreen,
        },
        Facebook: {
            screen: FacebookScreen,
        }
    },
{
    initialRouteName: 'Feed',
    contentComponent: DrawerComponent,
    drawerPosition: 'left',
    drawerWidth: 180,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
}
);



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
    FeedScreen : {
        screen : FeedScreen
    },
      Result : {
        screen: ResultScreen
      },
      Drawer: {
        screen: Drawer,
      }
  },
  {
    initialRouteName: 'FeedScreen',
    headerMode: 'none'
  }
);

const styles = StyleSheet.create({
    drawerImage : {
        height: 150,
        width: 150,
        borderRadius: 75,

    }

})

