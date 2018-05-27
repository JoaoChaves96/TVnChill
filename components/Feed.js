import React from 'react';
import { View,ScrollView, Text, TouchableHighlight } from 'react-native';

const Feed = ({feed}) => { 

    let i = 0
    const feedItems = []
    for (i; i < feed.length; i++) {
        let d = new Date(feed[i].date).toLocaleString()
        feedItems.push(
            <View key={feed[i].id} style={{marginTop:'2%', backgroundColor:'#c6c7c4', borderRadius:3, padding: '2%'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{ color:'#455561'}}>{feed[i].name} is watching </Text>
                    <Text style={{color:'#455561', fontWeight:'bold'}}>{feed[i].title}</Text>
                </View>
            <Text style={{fontSize: 13, color:'white', textAlign: 'right', marginTop:'3%'}}>{d}</Text>
        </View>
        )
    }


    return (
        
        <ScrollView style={{marginTop:'7%'}}>
            <View style={styles.containerStyle}>
                {feedItems}
            </View>

        </ScrollView>

        

    );
}

const styles= {
    containerStyle: {
        marginBottom: 10,
        marginLeft:10,
        marginRight:10
       
    }
}
export default Feed;