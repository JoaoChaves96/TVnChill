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

export default class friendsScreen extends Component {

  getFriends() {
    var user = firebase.auth().currentUser;
    var rows = [];

    var db_user = firebase.database().ref('users');

    db_user.on('value', function (snapshot) {
      snapshot.forEach(function (data) {
        if (data.val().email == user.email) {
          var user_key = data.key;

          var facebook_id = data.val().facebook_id;

          var friends_list = firebase.database().ref('friends/' + facebook_id);

          friends_list.on('value', function (snapshot) {
            var friends = snapshot.val().friends_list;

            console.log(friends);

            var split = friends.split(' ');

            for (i = 0; i < split.length; i++) {
              rows.push(
                <View><Text>{split[i]}</Text></View>
              )
            }
          })
        }
      })
    });
    return rows;
  }

  render() {
    return (
      <ScrollView>
        <Text>Friends:</Text>
        {this.getFriends()}
      </ScrollView>
    )
  }
}

module.exports = friendsScreen;