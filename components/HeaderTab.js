import React from 'react';
import {Header} from 'react-native-elements';


export default class HeaderTab extends React.Component{

    render(){

        return (

            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'TV N\' CHILL', style: { color: '#fff' } }}
                outerContainerStyles={{ backgroundColor: '#119da4' }}

            />


        );

    }


}