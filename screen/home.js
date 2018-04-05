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

export default class homeScreen extends Component {

    callGraph = async token => {
      /// Look at the fields... I don't have an `about` on my profile but everything else should get returned.
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
      );
      const responseJSON = JSON.stringify(await response.json());
      info = JSON.parse(responseJSON);
      console.log(responseJSON);
      this.props.navigation.navigate('LoggedIn', info);
    };
  
    login = async () => {
      const {
        type,
        token,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('423732801373177', {
        permissions: ['public_profile', 'email'],
      });
  
      if (type === 'success') {
        this.callGraph(token);
  
        this.firebaseLogin(token);
      }
    };
  
    renderButton = () => (
      <TouchableOpacity onPress={() => this.login()}>
        <View
          style={{
            width: '50%',
            alignSelf: 'center',
            borderRadius: 4,
            padding: 24,
            backgroundColor: '#3B5998',
          }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Login with Facebook
          </Text>
        </View>
      </TouchableOpacity>
    );
  
    renderValue = value => (
      <Text key={value} style={styles.paragraph}>{value}</Text>
    );
  
    start = async () => {
      this.props.navigation.navigate('Start');
    }
  
    render() {
      return (
        <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={{ paddingBottom: 10}}onPress={() => this.props.navigation.navigate('Start')}>
          <View
            style={{
              width: '50%',
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
  
          {this.renderButton()}
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