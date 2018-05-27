import React from 'react';
import { View,ScrollView } from 'react-native';

const Feed = ({feed}) => { 
    console.log('////////// Hello from feed //////////')
    console.log(feed);
    /*const movieItems = movies.map((movie) => (
        <MovieListItem
            key = {movie.id}
            movie = {movie}

           
        />
          
    ));*/


    return (
        
        <ScrollView>
            <View style={styles.containerStyle}>
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
export default Feed;