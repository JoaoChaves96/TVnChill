import React from 'react';
import { View, Text, Image } from 'react-native';

const MovieListItem = ({movie}) => {

    const {imageStyle} = styles;
    const {
        title,
        runtime,
        rating
    } = resutlLine.movie;
    return(
        <View>
            {/* <Image 
                style= {imageStyle}
                source={}
            /> */}
            <Text>{title}</Text>
            <Text>{runtime}</Text>
            <Text>{rating}</Text>
        </View>

    );
};

const styles= {
    imageStyle: {

    }
}
export default MovieListItem;