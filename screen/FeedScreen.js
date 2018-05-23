import React from 'react';
import {Text} from 'react-native';
import{Icon, Button, Container, Header, Content, Left, Body} from 'native-base';


export default class FeedScreen extends React.Component{

    render(){
        return (
           <Container contentContainerStyle={{
               flex: 1,
           }
           } style={{paddingTop: Expo.Constants.statusBarHeight}}
           >

               <Header style={{backgroundColor:'#119da4'}}>
                   <Left>
                       <Icon name='ios-menu' onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                   </Left>
                   <Body>
                   <Text style={{color:'white'}}>
                       TV N' CHILL
                   </Text>
                   </Body>
               </Header>

               <Content>
                   <Text>Ola</Text>
               </Content>
           </Container>
        );
    }
}