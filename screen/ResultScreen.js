import React from 'react';
import {Text, StyleSheet, ActivityIndicator, View} from 'react-native';
import {Icon, Container, Header, Content, Left, Body} from 'native-base';
import axios from "axios/index";
import SearchData from '../components/SearchData.js';
import Expo from "expo";

const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
    : `api.example.com`;

export default class ResultScreen extends React.Component{

    state = {
        aux : [],
        movies :[],
        images : [],
        shows: [],
        loaded : false
        

    }

     componentWillMount() {
        this.searchMovie(this.props.navigation.state.params.term);
        this.searchShow(this.props.navigation.state.params.term);
        } 

    searchMovie =  (term) => {
        let request = 'http://' + api + '/movies/' + term;
        
        axios.get(request).then((response) => {

            response.data.map(movie => (

                request = 'http://' + api + '/movies/getRating/' + movie.movie.ids.trakt,

                axios.get(request).then(response2 => {
                    //this.state.movies.push({id:movie.movie.ids.trakt, title: movie.movie.title, rating: response2.data.rating})

                    
                    request = 'http://' + api + '/movies/getImage/' + movie.movie.ids.tmdb

                    axios.get(request).then(response3 => {
                        if(response3.data.file_path == undefined){
                            this.state.movies.push({id:movie.movie.ids.trakt, year: movie.movie.year, overview: movie.movie.overview, title: movie.movie.title, rating: response2.data.rating, image:"https://www.unesale.com/ProductImages/Large/notfound.png" })
                            //this.state.images.push("https://vignette.wikia.nocookie.net/advenutres-of-powerpuff-girls-z/images/4/4e/Popeye.png/revision/latest/scale-to-width-down/185?cb=20170224034600");
                        }
                        else {
                            url = "http://image.tmdb.org/t/p/w185//" + response3.data.file_path;
                            //this.state.images.push(url);
                            this.state.movies.push({id:movie.movie.ids.trakt, year:movie.movie.year, overview: movie.movie.overview, title: movie.movie.title, rating: response2.data.rating, image:url })
                            
                        }
                        this.setState({loaded:true});
                        this.state.movies.sort(this.compare);
                        this.setState(
                            this.state
                        )
                        this.state
                    })
                })

            ))
            

        })
       
           
    } 

    searchShow =  (term) => {
        let request = 'http://' + api + '/shows/' + term;
        
        axios.get(request).then((response) => {

            response.data.map(show => (

                request = 'http://' + api + '/shows/getRating/' + show.show.ids.trakt,

                axios.get(request).then(response2 => {
                   
                    request = 'http://' + api + '/shows/getImage/' + show.show.ids.tmdb

                    axios.get(request).then(response3 => {
                        if(response3.data.file_path == undefined){
                            this.state.shows.push({id:show.show.ids.trakt, title: show.show.title, rating: response2.data.rating, image:"https://www.unesale.com/ProductImages/Large/notfound.png" })
                            }
                        else {
                            url = "http://image.tmdb.org/t/p/w185//" + response3.data.file_path;
                            //this.state.images.push(url);
                            this.state.shows.push({id:show.show.ids.trakt, title: show.show.title, rating: response2.data.rating, image:url })
                            
                        }
                        this.setState({loaded:true});
                        this.state.shows.sort(this.compare);
                        this.setState(
                            this.state
                        )
                        this.state
                    })
                })

            ))
            

        })
       
           
    } 
    compare(a,b) {
        if (a.rating > b.rating)
          return -1;
        if (a.rating < b.rating)
          return 1;
        return 0;
      }
      
      
    

    render(){

        const {movies,loaded, shows} = this.state;
        

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
                    <Text style={styles.title}> Results found for {this.props.navigation.state.params.term} </Text>
                    <View style = {styles.line}>
                        <Text style={styles.movieSection}> Movies </Text>
                    </View>
                    <SearchData allData={movies}  navigation={this.props.navigation}/>
                    <View style = {styles.line}>
                        <Text style={styles.movieSection}> Shows </Text>
                    </View>
                    <SearchData allData={shows} navigation={this.props.navigation}/>
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
    title : {
        fontSize: 19,
        color: "#119da4",
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        marginBottom: '1%',
    },
    container: { 
        padding: 10
    },
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
    } 
})