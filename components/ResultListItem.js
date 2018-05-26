import React from 'react';
import { View, Text, Image, TouchableHighlight} from 'react-native';
import { withNavigation } from 'react-navigation';

 const MovieListItem = ({movie, navigation}) => {
    return(
        <View style={{width: 100, alignItems:'center', marginBottom:'5%'}}>
            <TouchableHighlight onPress={() => navigation.navigate('MovieScreen', {id:movie.id})}>
             <Image 
             style={{width: 95, height: 130}}
                source={{uri: movie.image }}
            />
            </TouchableHighlight>
            <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>{movie.title}</Text>
            <Text style={{fontSize: 13, color:'white'}}>{(movie.rating).toFixed(1)}</Text>
        </View>

    );
};


export default withNavigation(MovieListItem);