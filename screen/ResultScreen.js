import React from 'react';
import {Text} from 'react-native';
import{Icon, Container, Header, Content, Left, Body} from 'native-base';
import axios from "axios/index";
import SearchResults from '../components/SearchResults.js';
import Expo from "expo";

const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
    : `api.example.com`;

export default class ResultScreen extends React.Component{

    state = {
        movies : [],

    }

    componentWillMount() {
        this.searchMovie(this.props.navigation.state.params.term);
    }

    searchMovie = term => {
        let request = 'http://' + api + '/movies/' + term;

        axios.get(request).then(response => {
            console.log(response.data);
            this.getRating(response.data[0].movie.ids.trakt);
            aux = [];

            response.data.map(function(movie) {
                aux.push({id: movie.movie.ids.trakt, title: movie.movie.title, rating: this.getRating(movie.movie.ids.trakt)})
            })

            this.setState({
                movies: aux
            })
        });
    };

    getRating = term => {
        let request = 'http://' + api + '/movies/getRating/' + term;

        axios.get(request).then(response => {
            return response.data.rating;
        });
    }



    render(){

        const {movies} = this.state;

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
                    <SearchResults movies={movies} />
                </Content>
            </Container>
        );
    }
}