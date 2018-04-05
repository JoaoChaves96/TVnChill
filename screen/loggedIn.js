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

export default class loggedInScreen extends Component {
    callGraphFriends = async token => {
      /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
      const response = await fetch(
        `https://graph.facebook.com/me/taggable_friends?access_token=${token}&fields=id,name&limit=1000`
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
        permissions: ['user_friends', 'read_custom_friendlists'],
      });
  
      if (type === 'success') {
        this.callGraphFriends(token);
      }
      else {
        console.log('error on get token');
      }
    };
    
    render(){
      /* 2. Read the params from the navigation state */
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

  module.exports = loggedInScreen;