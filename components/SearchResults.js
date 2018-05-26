import React from 'react';
import { View,ScrollView } from 'react-native';
import MovieListItem from './ResultListItem';

const SearchResults = ({movies}) => { 
    
    console.log(movies);
    const movieItems = movies.map((movie) => (
        <MovieListItem
            key = {movie.id}
            movie = {movie}

           
        />
          
    ));


    return (
        
        <ScrollView>
            <View style={styles.containerStyle}>
                 {movieItems} 
            </View>

        </ScrollView>

        

    );
}

const styles= {
    containerStyle: {
        marginBottom: 10,
        marginLeft:10,
        marginRight:10
       
    }
}
export default SearchResults;