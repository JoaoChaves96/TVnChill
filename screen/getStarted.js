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

export default class getStartedScreen extends Component {
  render(){
    return (
      <View>
        <Text> You just got started! Welcome to our app!</Text>
      </View>
    )
  }
}

module.exports = getStartedScreen;