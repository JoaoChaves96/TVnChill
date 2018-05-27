import React from 'react';
import {View,Text,Image, TouchableHighlight} from 'react-native';
import{Icon, Container, Header, Content, Left, Body} from 'native-base';
import firebase from 'firebase';

export default class MediaScreen extends React.Component{
    addtToWishlist = (user_key, id) => {
        console.log("É MOVIE" + this.props.navigation.state.params.isMovie);
        if(this.props.navigation.state.params.isMovie == true){
            let obj  = {
                id: id,
                type: 'movie'
            }
            firebase.database().ref('users/' + user_key).child('wishlist').push(obj)
        }
        else if(this.props.navigation.state.params.isMovie == false){
            let obj  = {
                id: id,
                type: 'show'
            }
            firebase.database().ref('users/' + user_key).child('wishlist').push(obj)
        }
        
        
    }

    addToSeen = (user_key, id) => {
        let d = new Date().toString()
        if(this.props.navigation.state.params.isMovie == true){
        let obj = {
            id: id,
            date: d,
            type: 'movie'
        }
        firebase.database().ref('users/' + user_key).child('seen').push(obj)
    } else if(this.props.navigation.state.params.isMovie == false){
        let obj = {
            id: id,
            date: d,
            type: 'show'
        }
        firebase.database().ref('users/' + user_key).child('seen').push(obj)
    }
        
    }

    addToSeen


    findUser = (type, id) => {
        let app = this
        let user = firebase.auth().currentUser;

        firebase.database().ref('users').once('value')
            .then(function(snapshot){
                snapshot.forEach(function(data){
                    if (data.val().email.toUpperCase() == user.email.toUpperCase()){
                        if(type== 'w')app.addtToWishlist(data.key, id);
                        else if(type == 's') app.addToSeen(data.key, id)
                    }
                })

            })


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
                    <View style={{ marginLeft:'5%'}}>
                    <View style={{marginTop:'7%',flexDirection:'row'}}>
                        <Image style={{width:170, height:280}}
                           source ={{uri:this.props.navigation.state.params.movie.image}}/>
                        <View style={{flex: 1, flexWrap:'wrap',marginLeft: '6%'}}>
                            <Text style={{color:'white', fontWeight:'bold', fontSize:24}}>{this.props.navigation.state.params.movie.title}</Text>
                            <Text style={{marginTop:'5%', color:'white', fontWeight:'bold', fontSize: 18}}>{this.props.navigation.state.params.movie.year}</Text>
                            <View style={{height:25, marginTop:'8%', flexDirection:'row', flex:1}}>
                                <Icon name='star' style={{color:'white'}}/>
                                <Text style={{marginLeft:'5%', marginTop:'3%', color:'white'}}>{this.props.navigation.state.params.movie.rating}</Text>
                            </View>
                            <TouchableHighlight onPress = {() => this.findUser('s', this.props.navigation.state.params.movie.id)}>
                                <View style={{height:25, marginTop:'8%', flexDirection:'row', flex:1}}>
                                    <Icon name='ios-desktop' style={{color:'white'}}/>
                                    <Text style={{marginLeft:'5%', marginTop:'3%', color:'white'}}>Watch now</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress = {() => this.findUser('w',this.props.navigation.state.params.movie.id)}>
                            <View style={{height:25, marginTop:'8%', flexDirection:'row', flex:1}}>
                                <Icon name='ios-add' style={{color:'white'}}/>
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