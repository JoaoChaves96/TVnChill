import React from 'react';
import { View,ScrollView } from 'react-native';
import ResultListItem from './ResultListItem';

const SearchData = ({allData, navigation}) => {
    
    const dataItems = allData.map((data) => (
        <ResultListItem key = {data.id} data = {data} navigation = {navigation}/>
    ));

    return (
        <ScrollView>
            <View style={styles.containerStyle}>
                 {dataItems} 
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
export default SearchData;