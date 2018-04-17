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

export default class facebookLoginScreen extends Component {

    /*loadFaceBookFriends = (info) => {
        var user = firebase.auth().currentUser;
        var email = user.email;

        for (var i = 0; i < info.length; i++) {
            firebase.database().ref('/users/' + email + '/').set({
                facebook_id: info.id
            })
        }
    }
  
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
    );*/
  
    renderValue = value => (
      <Text key={value} style={styles.paragraph}>{value}</Text>
    );
  
    start = async () => {
      this.props.navigation.navigate('Start');
    }
  
    render() {
      return (
        <ScrollView contentContainerStyle={styles.container}>  
          {this.renderButton()}
        </ScrollView>
      );
    }
  }

  module.exports = facebookLoginScreen;

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