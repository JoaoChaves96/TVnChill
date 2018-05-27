import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

const SeenMovies = ({data, navigation}) => {
    return(
        <View style={{width: 100, alignItems:'center', marginBottom:'5%'}}>
            <TouchableHighlight onPress={() => navigation.navigate('Wishlist', {id:data.id})}>
             <Image 
             style={{width: 95, height: 130}}
                source={{uri: data.image }}
            />
            </TouchableHighlight>
            <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>{data.title}</Text>
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