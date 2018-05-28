import React from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';

export default class LogoutScreen extends React.Component{

    componentDidMount() {
        let app = this
        firebase.auth().signOut().then(function () {

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