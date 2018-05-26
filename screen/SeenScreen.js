import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import{Icon, Container, Header, Content, Left, Body} from 'native-base';


export default class SeenScreen extends React.Component{

    render(){
        return (
            <Container contentContainerStyle={{
                flex: 1,
            }
            } style={{paddingTop: Expo.Constants.statusBarHeight}}
            >

                <Header style={{backgroundColor:'#119da4'}}>
                    <Left>
                        <Icon name='ios-menu' style={{color:'white'}} onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                    </Left>
                    <Body style={{marginLeft:'15%'}}>
                    <Text style={{color:'white', fontSize:17, fontWeight:'bold'}}>
                        TV N' CHILL
                    </Text>
                    </Body>
                </Header>

                <Content style={{backgroundColor:'#455561'}}>
                    <View style={{marginTop:'2%', alignItems:'center'}}>
                        <Text style={styles.title}> Seen </Text>
                    </View>
                    <View style = {styles.line}>
                        <Text style={styles.movieSection}> Movies </Text>
                    </View>
                    <View>
                        <Text> Insert movies here</Text>
                    </View>
                    <View style = {styles.line}>
                        <Text style={styles.movieSection}> Shows </Text>
                    </View>
                    <View>
                        <Text> Insert shows here</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    line : {
        borderBottomColor: '#119da4',
        borderBottomWidth: 1,
        marginLeft: '4%',
        marginRight: '4%',
        marginTop:'3%',
    },
    movieSection: {
        fontSize: 19,
        color: "#119da4",
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        marginBottom: '1%'
    },
    title : {
        fontSize: 30,
        color: "#119da4",
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        marginBottom: '1%',
    }
});