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
    console.log(info.data);

    var user = firebase.auth().currentUser;
    var friends = '';

    for (var i = 0; i < info.data.length; i++) {
      friends = friends + ' ' + info.data[i].id;
    }

    var db_user = firebase.database().ref('users');
    db_user.on('value', function (snapshot) {
      snapshot.forEach(function (data) {
        if (data.val().email.toUpperCase() == user.email.toUpperCase()) {
          var user_key = data.key;

          var facebook_id = data.val().facebook_id;

          var friends_list = firebase.database().ref('friends/' + facebook_id);

          friends_list.child('friends_list').set(friends);
        }
      })
    });

    this.props.navigation.navigate('Friends');
  };

  getFriends = async () => {
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('423732801373177', {
      permissions: ['user_friends'],
    });

    if (type === 'success') {
      console.log('success, getting friends...');
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
    var info = JSON.parse(responseJSON);
    var user = firebase.auth().currentUser;
    console.log('1 user info: ' + info.id);


    var db_user = firebase.database().ref('users');
    db_user.on('value', function (snapshot) {
      snapshot.forEach(function (data) {
        console.log(data.val().email);
        console.log(user.email);
        if (data.val().email.toUpperCase() == user.email.toUpperCase()) {
          var new_ref = firebase.database().ref('users/' + data.key);
          console.log('facebook id line.151: ' + info.id);
          new_ref.child('facebook_id').set(info.id);
        }
      })
    });

    console.log('2 user info: ' + info.id);
    var friends = firebase.database().ref('friends/' + info.id);
    friends.set({
      friends_list: ''
    });
  }

  login = async () => {
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('423732801373177', {
      permissions: ['public_profile'],
    });

    if (type === 'success') {
      this.callGraph(token);
      this.getFriends();
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