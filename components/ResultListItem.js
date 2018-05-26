import React from 'react';
import { View, Text, Image } from 'react-native';

const MovieListItem = ({movie}) => {
    return(
        <View>
             <Image 
             style={{width: 75, height: 75}}
                source={{uri: movie.image }}
            /> 
            <Text>{movie.title}</Text>
            <Text>{movie.rating}</Text>
        </View>

    );
};


export default MovieListItem;