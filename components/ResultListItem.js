import React from 'react';
import { View, Text, Image, TouchableHighlight} from 'react-native';
import { withNavigation } from 'react-navigation';

 const ResultListItem = ({data, navigation}) => {
    return(
        <View style={{width: 100, alignItems:'center', marginBottom:'5%'}}>
            <TouchableHighlight onPress={() => navigation.navigate('Wishlist', {id:data.id})}>
             <Image 
             style={{width: 95, height: 130}}
                source={{uri: data.image }}
            />
            </TouchableHighlight>
            <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>{data.title}</Text>
            <Text style={{fontSize: 13, color:'white'}}>{(data.rating).toFixed(1)}</Text>
        </View>

    );
};


export default withNavigation(ResultListItem);