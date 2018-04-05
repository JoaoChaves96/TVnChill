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

export default class friendsScreen extends Component {
    render(){
  
      const { params } = this.props.navigation.state;
      const rows = [];
      var i;
      for (i = 0; i < params.data.length; i++){
          rows.push(<View><Text>{params.data[i].name}</Text></View>)
      }
  
      return (
        <ScrollView>
          <Text>Friends:</Text>
          {rows}
        </ScrollView>
      )
    }
  }

  module.exports = friendsScreen;