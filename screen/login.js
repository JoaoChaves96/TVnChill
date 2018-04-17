import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import * as firebase from 'firebase';

export default class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', error: '', loading: false };
    }

    onLoginPress() {
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('LoggedIn');
            })
            .catch((error) => {
                this.setState({ error: 'Authentication failed', loading: false });
                console.log(error);
            })
    }

    renderButtonorLoading() {
        if (this.state.loading) {
            return <Text> Loading </Text>
        }
        return <View>
            <TouchableOpacity onPress={this.onLoginPress.bind(this)}>
                <View
                    style={{
                        width: '30%',
                        borderRadius: 4,
                        padding: 24,
                    }}>
                    <Text style={{ textAlign: "center", color: '#3B5998', fontWeight: 'bold' }}>
                        Login
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput onChangeText={email => this.setState({ email })}
                    placeholder='john@doe.com' />
                <FormLabel>Password</FormLabel>
                <FormInput onChangeText={password => this.setState({ password })}
                    secureTextEntry
                    placeholder='********' />
                {this.renderButtonorLoading()}
            </View>
        )
    }
}