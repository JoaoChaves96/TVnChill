import React from 'react';
import {View, Text, TouchableOpacity, Stylesheet, StyleSheet} from 'react-native';
import {FormInput} from 'react-native-elements';
import * as firebase from 'firebase';

export default class loginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', error: '', loading: false};
    }

    onLoginPress() {
        this.setState({error: '', loading: true});

        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Logged in successfully');
                this.setState({error: '', loading: false});
                this.props.navigation.navigate('FeedScreen');
            })
            .catch((error) => {
                this.setState({error: 'Authentication failed', loading: false});
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
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Login</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <FormInput onChangeText={email => this.setState({email})}
                               />
                    <Text style={[styles.label, {marginTop:'4%'}]}>Password</Text>
                    <FormInput onChangeText={password => this.setState({password})}
                               secureTextEntry
                               />
                    {this.renderButtonorLoading()}
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#455561',
    },
    titleView : {
        alignItems: 'center',
        marginTop: '20%',
    },
    title : {
        fontSize: 40,
        color: "#119da4",
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    },
    form : {
        marginTop: '12%',
    },
    label : {
        marginLeft: '8%',
        marginBottom: '-2%',
        fontSize: 17,
        fontWeight: 'bold',
        color:'#c6c7c4',
    },
    button : {
        width: 140,
        alignSelf: 'center',
        borderRadius: 4,
        padding: 14,
        backgroundColor: '#119da4',
        marginTop: '10%',
    },
    buttonText : {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },

});


