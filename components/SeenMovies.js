import React from 'react';
import { View, Text, Image } from 'react-native';

const SeenMovies = ({movie}) => {
    return(
        <View>
             <Image  
                style={{width: 75, height: 75, marginTop:10}} 
                source={{uri: movie.image }} 
            />  
            <Text>{movie.title}</Text>
            
        </View>

    );
};

const styles= {
    containerStyle: {
        marginBottom: 10,
        marginLeft:10,
        marginRight:10
       
    }
}
export default SeenMovies;