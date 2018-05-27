import React from 'react';
import { View,ScrollView } from 'react-native';
import SingleResult from './SingleResult';

const ResultsToShow = ({data,navigation}) => { 
    
    const movieItems = data.map(movie => (
        <SingleResult
            key = {movie.id}
            data = {movie}
            navigation = {navigation}
        />
          
    ));


    return (
        
        <ScrollView>
            <View style={styles.containerStyle}>
                 {movieItems} 
            </View>

        </ScrollView>

        

    );
}

const styles= {
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        marginRight: '4%',
        marginLeft: '4%',
        marginTop: '5%',
       
    }
}
export default ResultsToShow;