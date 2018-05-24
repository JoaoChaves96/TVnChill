import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import{Icon, Container, Header, Content, Left, Body} from 'native-base';
import SearchResults from '../components/SearchResults.js';

import axios from 'axios';
import Expo from "expo";

const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
    : `api.example.com`;


export default class FeedScreen extends React.Component{

    state = {
        loading: false,
        movies: [],
        term: ''
    }

    onPressSearch = () => {
        this.searchMovie(this.state.term);
    }
    searchMovie = term => {
        let request = 'http://' + api + '/movies/' + term;
        this.setState({loading: true});

        axios.get(request).then(response => {
            console.log(response.data);

            this.setState({
                loading:false,
                movies: response.data
            });
        });
    }


    render(){

        const {loading, movies} = this.state;
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
                    onPress={this.onPressSearch}>
                       <Text style={styles.textButton}>
                           {loading ? loadingText : searchText}
                       </Text>
                   </TouchableOpacity>
                   <SearchResults movies={movies} />

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