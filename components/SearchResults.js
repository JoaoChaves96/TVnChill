import React from 'react';
import { View,ScrollView } from 'react-native';
import SeenMovies from './SeenMovies';

const SearchResults = ({movies}) => { 
    
    const movieItems = movies.map(movie => (
        <SeenMovies
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