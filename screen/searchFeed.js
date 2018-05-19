import React from 'react';
import { View,  Text, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SearchBar from '../components/searchBar.js';
import trakt from '../trakt.js';
import SearchResult from '../components/searchResults';


export default class searchFeed extends React.Component{
    
    state = {
        loading: false,
        result
        

        
    }
   
    onPressSearch = term => {
        /* this.setState({loading:true});
        console.log("Feed received " + term);
        this.setState({result: new trakt.searchMovie(term)}); // mudar aqui a função e atualizar a variavel result com a resposta
        this.setState({loading: false}); */
    }



    render(){
        const {loading, result} = this.state;
        
        return (
            <View >
                <SearchBar
                loading = {loading}
                onPressSearch={this.onPressSearch}/>

                {/* <SearchResult
                    result = {result}
                /> */}
            </View>
        );
    }

}



module.exports = searchFeed;