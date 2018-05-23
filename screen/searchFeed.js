import React from 'react';
import {View, StyleSheet} from 'react-native';
import SearchBar from '../components/searchBar.js';
import SearchResults from '../components/SearchResults.js';
import HeaderTab from '../components/HeaderTab.js';
import axios from 'axios';
import Expo from "expo";


const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

export default class searchFeed extends React.Component{
    
    state = {
        loading: false,
        movies: []
    }
   
    onPressSearch = term => {
        this.searchMovie(term);
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
        
        return (
            <View style={styles.container}>
                <HeaderTab/>
                <SearchBar
                loading = {loading}
                onPressSearch={this.onPressSearch}
                />
               <SearchResults movies={movies} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#455561',
    }

})


module.exports = searchFeed;