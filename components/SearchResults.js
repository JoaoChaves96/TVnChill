import React from 'react';
import { View,ScrollView } from 'react-native';
import MovieListItem from './ResultListItem';

const SearchResults = ({movies, navigation}) => {
    
    console.log(movies);
    const movieItems = movies.map((movie) => (
        <MovieListItem key = {movie.id} movie = {movie} navigation = {navigation}/>
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
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        marginRight: '4%',
        marginLeft: '4%',
        marginTop: '5%',
    }
}
export default SearchResults;