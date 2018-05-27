import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import  {Icon, Container, Header, Content, Left, Body} from 'native-base';


import axios from 'axios';
import Expo from "expo";

export default class FeedScreen extends React.Component{

    state = {
        loading: false,
        term: ''
    }

    render(){

        const {loading} = this.state;
        const searchText = <Text> Search </Text>;
        const loadingText = <Text> Loading... </Text>;

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
                    <SearchBar lightTheme onChangeText={term => this.setState({term})} placeholder='Type Here...'/>
                   <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate('Result', {term: this.state.term})}>
                       <Text style={styles.textButton}>
                           {loading ? loadingText : searchText}
                       </Text>
                   </TouchableOpacity>
               </Content>
           </Container>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 140,
        alignSelf: 'center',
        borderRadius: 4,
        padding: 8,
        backgroundColor: '#119da4',
        marginTop: '2%',
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})