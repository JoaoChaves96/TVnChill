import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Expo from 'expo';
import * as firebase from 'firebase';

export default class loggedInScreen extends Component {

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Start')}>
          <View
            style={styles.button}>
            <Text style={styles.textButton}>
              Get Started!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

module.exports = loggedInScreen;

const styles = StyleSheet.create({
    button: {
        width: '70%',
        alignSelf: 'center',
        borderRadius: 4,
        padding: 24,
        backgroundColor: '#119da4',
    },
    textButton: {
      textAlign: "center",
        color: 'white',
        fontWeight: 'bold',
    }

})
