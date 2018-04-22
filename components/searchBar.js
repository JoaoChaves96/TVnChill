import React from 'react';
import { View, Button, TextInput } from 'react-native';


class SearchBar extends React.Component {
    
    state = {term: ''};
    
    render() {
        const {
            containerStyle,
            searchTextStyle,
            buttonStyle
        } = styles;
    

    return (
        <View style={containerStyle}>
                <TextInput
                    style={searchTextStyle}
                    onChangeText = {term => this.setState({term})}
                    value={this.state.term}
                />
                <Button 
                    style={buttonStyle}
                    title={this.props.loading ? 'Loading...' : 'Search'}
                    onPress={() => this.props.onPressSearch(this.state.term)}
                
                />
            </View>
    )
}
}

const styles= {
    containerStyle: {
        marginTop: 75,
        marginLeft: 10,
        marginRight: 10
    },

    searchTextStyle: {
        
    },
    buttonStyle: {
        height: 30,
        marginBottom: 8
    }
}

module.exports = SearchBar;
