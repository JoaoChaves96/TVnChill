import Expo, { Constants } from 'expo';
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
  Image,
} from 'react-native';

export default class homeScreen extends Component {
  renderButton = (text, navigateTo) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate(navigateTo)}>
      <View
        style={styles.button}>
        <Text style={styles.textButton}>
          {text}
          </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>

          <Image
              style = {styles.image}
              source={require('../img/logo.png')}/>

        {this.renderButton('Login', 'Login')}
        <TouchableOpacity style={{ paddingBottom: 30}}></TouchableOpacity>
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
    backgroundColor: '#455561',
    alignItems: 'center',
  },
    button: {
      width: 170,
        alignSelf: 'center',
        borderRadius: 4,
        padding: 20,
        backgroundColor: '#119da4',

    },
    textButton: {
      textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    image: {
      width: 300,
        height: 250,
        marginBottom: 40,
    },
});
