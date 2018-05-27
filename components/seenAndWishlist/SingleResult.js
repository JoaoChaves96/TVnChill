import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

const SingleResult = ({data, navigation}) => {
    return(
        <View style={{width: 100, alignItems:'center', marginBottom:'5%'}}>
             <Image 
             style={{width: 95, height: 130}}
                source={{uri: data.image }}
            />
            <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>{data.title}</Text>
        </View>

    );
};


export default SingleResult;