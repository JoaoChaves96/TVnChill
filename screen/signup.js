import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import firebase from 'firebase';

export default class signUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', name: '', email: '', password: '', error: '', loading: false };
    }

    onSignUpPress() {
        this.setState({ error: '', loading: true });

        const { username, name, email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                firebase.database().ref('users/')
                    .push({
                        name: name,
                        username: username,
                        email: email,
                        facebook_id: ''
                    });
                this.props.navigation.navigate('Login');
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
            <TouchableOpacity onPress={this.onSignUpPress.bind(this)}>
                <View
                    style={{
                        width: '30%',
                        borderRadius: 4,
                        padding: 24,
                    }}>
                    <Text style={{ textAlign: "center", color: '#3B5998', fontWeight: 'bold' }}>
                        Sign Up
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <View>
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={name => this.setState({ name })}
                    placeholder='John Doe' />
                <FormLabel>Username</FormLabel>
                <FormInput onChangeText={username => this.setState({ username })}
                    placeholder='johndoe' />
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