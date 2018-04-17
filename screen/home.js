import Expo, { Constants } from 'expo';
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class homeScreen extends Component {
  renderButton = (text, navigateTo) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate(navigateTo)}>
      <View
        style={{
          width: '50%',
          alignSelf: 'center',
          borderRadius: 4,
          padding: 24,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
          {text}
          </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderButton('Login', 'Login')}
        <TouchableOpacity style={{ paddingBottom: 10}}></TouchableOpacity>
        {this.renderButton('Sign Up', 'SignUp')}
      </ScrollView>
    );
  }
}

module.exports = homeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});