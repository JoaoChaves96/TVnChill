import React from 'react';
import { ScrollView} from 'react-native';
import ResultListItem from './ResultListItem';

const searchResult = ({result}) => { //vai buscar o parametro result de quando se chamou o search result no searchfeed
    
    const resultItems = result.map(resultLine => (
        <ResultListItem
        //key={resultLine.....ids.trakt}
        resultLine = {resultLine}
        />
    ));


    return (
        <ScrollView>
            <View style={styles.containerStyle}>
            {resultItems}
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
export default searchResult;