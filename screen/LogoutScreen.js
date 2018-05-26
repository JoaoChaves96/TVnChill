import React from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';

export default class LogoutScreen extends React.Component{

    componentDidMount() {
        let app = this
        console.log('Signing out...')
        firebase.auth().signOut().then(function () {
            console.log('Logout')
            app.props.navigation.navigate('Home')
        }, function(error) {
            // An error happened.
            console.log(error);

          });
    }

    render(){
        return (
            <View></View>
        )
    }
}