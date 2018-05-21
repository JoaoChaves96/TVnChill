import React from 'react';
import { View, Text, Image } from 'react-native';

const MovieListItem = ({movie}) => {
    return(
        <View>
            {/* <Image 
                style= {imageStyle}
                source={}
            /> */}
            <Text>{movie.movie.title}</Text>
            <Text>{movie.score}</Text>
            <Text>{movie.movie.overview}</Text>
        </View>

    );
};


export default MovieListItem;