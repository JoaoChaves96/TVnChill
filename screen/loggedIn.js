/*import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import Expo, { Constants } from 'expo';
import { StackNavigator } from 'react-navigation';

export default class loggedInScreen extends Component {
    callGraphFriends = async token => {
      /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
      const response = await fetch(
        `https://graph.facebook.com/me/friends?access_token=${token}`
      );
      const responseJSON = JSON.stringify(await response.json());
      info = JSON.parse(responseJSON);
      //console.log(info.data[0]);
      this.props.navigation.navigate('Friends', info);
    };
  
    getFriends = async () => {
      const {
        type,
        token,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('423732801373177', {
        permissions: ['user_friends'],
      });
  
      if (type === 'success') {
        this.callGraphFriends(token);
      }
      else {
        console.log('error on get token');
      }
    };
    
    render(){
      const { params } = this.props.navigation.state;
      const id = params ? params.id : null;
      const name = params ? params.name : null;
      const email = params ? params.email : null;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Logged in!</Text>
          <Text> Your info was :</Text>
          <Text> Id: {JSON.stringify(id)} </Text>
          <Text> Name: {JSON.stringify(name)} </Text>
          <Text> Email: {JSON.stringify(email)} </Text>
          <TouchableOpacity style={{ paddingBottom: 10}}onPress={() => this.getFriends()}>
          <View
            style={{
              width: '50%',
              alignSelf: 'center',
              borderRadius: 4,
              padding: 24,
              backgroundColor: '#3B5998',
            }}>
            <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>
              Get Friends list!
            </Text>
          </View>
        </TouchableOpacity>
        </View>
      )
    }
  }

  module.exports = loggedInScreen;*/

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
import * as firebase from 'firebase';

export default class loggedInScreen extends Component {

  callGraphFriends = async token => {
    /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
    const response = await fetch(
      `https://graph.facebook.com/me/friends?access_token=${token}`
    );
    const responseJSON = JSON.stringify(await response.json());
    info = JSON.parse(responseJSON);
    //console.log(info.data[0]);
    this.props.navigation.navigate('Friends', info);
  };

  getFriends = async () => {
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('423732801373177', {
      permissions: ['user_friends'],
    });

    if (type === 'success') {
      this.callGraphFriends(token);
    }
    else {
      console.log('error on get token');
    }
  };

  callGraph = async token => {
    /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
    );
    const responseJSON = JSON.stringify(await response.json());
    info = JSON.parse(responseJSON);
    console.log(responseJSON);
    var user = firebase.auth().currentUser;
    var email = user.email;

    var ref = firebase.database().ref('users');

    ref.on('value', getData, errData);

    function getData(data) {
      var user_it = data.val();
      var keys = Object.keys(user_it);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var email1 = user_it[k].email;
        //if(email1 == email)//work in progress
      }
    };

    function errData(data) {
      //todo
    };
  };

  login = async () => {
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('423732801373177', {
      permissions: ['public_profile'],
    });

    if (type === 'success') {
      this.callGraph(token);
    }
  };

  getFriends = async () => {
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('423732801373177', {
      permissions: ['user_friends'],
    });

    if (type === 'success') {
      this.callGraphFriends(token);
    }
    else {
      console.log('error on get token');
    }
  };

  renderButton = () => (
    <TouchableOpacity onPress={() => this.login()}>
      <View
        style={{
          width: '70%',
          alignSelf: 'center',
          borderRadius: 4,
          padding: 24,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>
          Login with Facebook!
          </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.renderButton()}
        <TouchableOpacity style={{ paddingBottom: 10 }}></TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Start')}>
          <View
            style={{
              width: '70%',
              alignSelf: 'center',
              borderRadius: 4,
              padding: 24,
              backgroundColor: '#3B5998',
            }}>
            <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>
              Get Started!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports = loggedInScreen;