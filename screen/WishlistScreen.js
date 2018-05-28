import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import{Icon, Container, Header, Content, Left, Body} from 'native-base';
import Expo from "expo";
import axios from "axios/index";
import ResultsToShow from '../components/seenAndWishlist/ResultsToShow';
import * as firebase from 'firebase';


const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
    : `api.example.com`;


export default class WishlistScreen extends React.Component{

    constructor(props) {
        super(props);

        this.user = firebase.auth().currentUser;
    }

    state = {
        email : '',
        movies : [],
        shows: [],
        loaded : false
    }

    componentWillMount() {
        this.getWishlistMovies(this.state.email);
    }

    aux(key) {
        let app = this;
        firebase.database().ref('users').child(key).child('wishlist').once('value')
        .then(function (snapshot) {
            snapshot.forEach(function (data) {
               if(data.val().type == "movie"){
                let request = 'http://' + api + '/movies/getMovieFromId/'+ data.val().id;
                axios.get(request).then(response => {
                    request = 'http://' + api + '/movies/getImage/' + response.data.ids.tmdb;
                    axios.get(request).then(response2 => {
                        if(response2.data.file_path == undefined){
                            app.state.movies.push({title: response.data.title, image:"https://www.unesale.com/ProductImages/Large/notfound.png",id: response.data.ids.tmdb })
                             }
                        else {
                            url = "http://image.tmdb.org/t/p/w185//" + response2.data.file_path;
                            app.state.movies.push({title: response.data.title, image:url, id:response.data.ids.tmdb })
                        }
                        app.setState({loaded: true});
                        app.setState( 
                            app.state 
                        ) 
                        app.state 
                   
                    })
                });
               }
               else if (data.val().type == "show"){
                let request = 'http://' + api + '/shows/getShowFromId/'+ data.val().id;
                axios.get(request).then(response => {
                    request = 'http://' + api + '/shows/getImage/' + response.data.ids.tmdb;
                    axios.get(request).then(response2 => {
                        if(response2.data.file_path == undefined){
                            app.state.shows.push({title: response.data.title, image:"https://www.unesale.com/ProductImages/Large/notfound.png",id: response.data.ids.tmdb })
                            }
                        else {
                            url = "http://image.tmdb.org/t/p/w185//" + response2.data.file_path;
                            app.state.shows.push({title: response.data.title, image:url, id:response.data.ids.tmdb })
                        }
                        app.setState({loaded: true});
                        app.setState( 
                            app.state 
                        ) 
                        app.state 
                   
                    })
                });
               }
                
                
            })
            
        })
        
    }


    getWishlistMovies = (email) => {
        let user = firebase.auth().currentUser
        let app = this
    
        var db_user = firebase.database().ref('users');
        db_user.once('value')
        .then(function(snapshot) {
            snapshot.forEach(function (data) {
                if (data.val().email.toUpperCase() == user.email.toUpperCase()) {
                    app.aux(data.key)
                    return 2
                }
            })
        })
    }
    render(){
        const {movies,shows} = this.state;

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
                { this.state.loaded ? 
                    <View>
                    <View style={{marginTop:'2%', alignItems:'center'}}>
                        <Text style={styles.title}> Wishlist </Text>
                    </View>
                    <View style = {styles.line}>
                        <Text style={styles.movieSection}> Movies </Text>
                    </View>
                    <Content >
                        <ResultsToShow data={movies} navigation={this.props.navigation}/>
                    </Content>
                    <View style = {styles.line}>
                        <Text style={styles.movieSection}> Shows </Text>
                    </View>
                    <Content >
                        <ResultsToShow data={shows} navigation={this.props.navigation}/>
                    </Content>
                    </View>
                    :
                    <View style={styles.container} >
                        <ActivityIndicator size="large" color="#119da4" />
                    </View>
                    }
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
    },
    container: {
        padding: 10
      }
});