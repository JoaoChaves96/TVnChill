import React from 'react';
import { View, Text, Image } from 'react-native';

const MovieListItem = ({movie}) => {
    return(
        <View>
            {/* <Image 
                style= {imageStyle}
                source={}
            /> */}
            <Text> Oi </Text>
            <Text>{movie.title}</Text>
            <Text>{movie.rating}</Text>
        </View>

    );
};


export default MovieListItem;