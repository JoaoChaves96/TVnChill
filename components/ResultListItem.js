import React from 'react';
import { View, Text, Image } from 'react-native';

const VideoListItem = ({resultLine}) => {

    const {imageStyle} = styles;
    const {
        title,
        runtime,
        rating
    } = resutlLine.movie;
    return(
        <View>
            <Image 
                style= {imageStyle}
                source={{/*uri: ir buscar */}}
            />
            <Text>{title}</Text>
            <Text>{runtime}</Text>
            <Text>{rating}</Text>
        </View>

    );
};

const style= {
    imageStyle: {

    }
}
export default VideoListItem;