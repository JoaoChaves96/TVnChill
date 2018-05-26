import React from 'react';
import { View, Text, Image } from 'react-native';

const MovieListItem = ({movie}) => {
    return(
        <View style={{width: 100, alignItems:'center', marginBottom:'5%'}}>
             <Image 
             style={{width: 95, height: 130}}
                source={{uri: movie.image }}
            /> 
            <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>{movie.title}</Text>
            <Text style={{fontSize: 13, color:'white'}}>{(movie.rating).toFixed(1)}</Text>
        </View>

    );
};


export default MovieListItem;