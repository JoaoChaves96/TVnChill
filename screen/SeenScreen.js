import React from 'react';
import {View,Text, StyleSheet, ActivityIndicator} from 'react-native';
import{Icon, Container, Header, Content, Left, Body} from 'native-base';
import * as firebase from 'firebase';
import SearchResults from '../components/SearchResults.js'
import Expo from "expo";
import axios from "axios/index";


const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
    : `api.example.com`;

export default class SeenScreen extends React.Component{

    constructor(props) {
        super(props);

        this.user = firebase.auth().currentUser;
    }

    state = {
        email : '',
        movies : [],
        loaded : false
    }

    componentWillMount() {
        this.getSeenMovies(this.state.email);
    }


    aux(key) {
        let app = this;
        firebase.database().ref('users').child(key).child('seen').once('value')
        .then(function (snapshot) {
            snapshot.forEach(function (data) {
                
                //app.state.movies.push(data.val().id);
                let request = 'http://' + api + '/movies/getMovieFromId/'+ data.val().id;
                axios.get(request).then(response => {
                    request = 'http://' + api + '/movies/getImage/' + response.data.ids.tmdb;
                    axios.get(request).then(response2 => {
                        if(response2.data.file_path == undefined){
                            app.state.movies.push({title: response.data.title, image:"https://vignette.wikia.nocookie.net/advenutres-of-powerpuff-girls-z/images/4/4e/Popeye.png/revision/latest/scale-to-width-down/185?cb=20170224034600",id: response.data.ids.tmdb })
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
                
            })
            
        })
        
    }

    getSeenMovies = (email) => {
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

    /*     searchMovie =  (term) => {
        let request = 'http://' + api + '/movies/' + term;
        
        axios.get(request).then((response) => {
 
            response.data.map(movie => (
 
                request = 'http://' + api + '/movies/getRating/' + movie.movie.ids.trakt,
 
                axios.get(request).then(response2 => {

                    request = 'http://' + api + '/movies/getImage/' + movie.movie.ids.tmdb
 
                    axios.get(request).then(response3 => {
                        if(response3.data.file_path == undefined){
                            this.state.movies.push({id:movie.movie.ids.trakt, title: movie.movie.title, rating: response2.data.rating, image:"https://vignette.wikia.nocookie.net/advenutres-of-powerpuff-girls-z/images/4/4e/Popeye.png/revision/latest/scale-to-width-down/185?cb=20170224034600" })
                             }
                        else {
                            url = "http://image.tmdb.org/t/p/w185//" + response3.data.file_path;
                            
                            this.state.movies.push({id:movie.movie.ids.trakt, title: movie.movie.title, rating: response2.data.rating, image:url })
                            
                        }
                        this.setState(
                            this.state
                        )
                        this.state
                    })

                })
 
            ))
 
        })
       
           
    }  */


    render(){
        

        
        const {movies} = this.state;
        
        return (
            <Container contentContainerStyle={{
                flex: 1,
                justifyContent: 'center'
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
                        <Text style={styles.title}> Seen </Text>
                    </View>

                    <View style = {styles.line}>
                        <Text style={styles.movieSection}> Movies </Text>
                    </View>
                    <Content >
                        <SearchResults movies={movies} />
                    </Content>
                    <View style = {styles.line}>
                        <Text style={styles.movieSection}> Shows </Text>
                    </View>
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