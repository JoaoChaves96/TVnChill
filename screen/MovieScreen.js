import React from 'react';
import {View,Text,Image, TouchableHighlight} from 'react-native';
import{Icon, Container, Header, Content, Left, Body} from 'native-base';
import firebase from 'firebase';

export default class MovieScreen extends React.Component{

    addtToWishlist = (id) => {
        alert(id);
    }

    render(){
        return (
            <Container contentContainerStyle={{
                flex: 1,
            }
            } style={{paddingTop: Expo.Constants.statusBarHeight}}
            >

                <Header style={{backgroundColor:'#119da4'}}>
                    <Left>
                        <Icon name='ios-menu' style={{color:'white'}} onPress={() => this.props.navigation.navigate('DrawerOpen')} />
                    </Left>
                    <Body style={{marginLeft:'15%'}}>
                    <Text style={{color:'white', fontSize:17, fontWeight:'bold'}}>
                        TV N' CHILL
                    </Text>
                    </Body>
                </Header>

                <Content style={{backgroundColor:'#455561'}}>
                    <View style={{marginLeft:'5%'}}>
                    <View style={{marginTop:'7%',flexDirection:'row'}}>
                        <Image style={{width:170, height:280}}
                           source ={{uri:this.props.navigation.state.params.movie.image}}/>
                        <View style={{marginLeft: '6%'}}>
                            <Text style={{color:'white', fontWeight:'bold', fontSize:26}}>{this.props.navigation.state.params.movie.title}</Text>
                            <Text style={{marginTop:'5%', color:'white', fontWeight:'bold', fontSize: 18}}>{this.props.navigation.state.params.movie.year}</Text>
                            <View style={{height:25, marginTop:'8%', flexDirection:'row', flex:1}}>
                                <Icon name='star' style={{color:'white'}}/>
                                <Text style={{marginLeft:'5%', marginTop:'3%', color:'white'}}>{this.props.navigation.state.params.movie.rating}</Text>
                            </View>
                            <TouchableHighlight style={{marginBottom:'10%'}} onPress = {() => this.addtToWishlist(this.props.navigation.state.params.movie.id)}>
                            <View style={{height:25, marginTop:'8%', flexDirection:'row', flex:1}}>
                                <Icon name='ios-desktop' style={{color:'white'}}/>
                                <Text style={{marginLeft:'5%', marginTop:'3%', color:'white'}}>Add to Wishlist</Text>
                            </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <Text style={{marginTop:'3%', marginRight: '4%',color:'white', fontSize:13}}>{this.props.navigation.state.params.movie.overview}</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}