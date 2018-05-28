import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import{Icon, Container, Header, Content, Left, Body} from 'native-base';
import Feed from '../components/Feed.js';
import axios from "axios/index";
import * as firebase from 'firebase';

import Expo from "expo";

const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
    : `api.example.com`;

export default class FeedScreen extends React.Component{

    state = {
        loading: false,
        term: '',
        feed: []
    }

    processArray (arr) {
       
        let app = this
        for (i = 1; i < arr.length; i++) {
            app.loadWithId(arr[i])
         }
         return 0
    }

    loadFriends (facebookId) {
        let app = this
      
        let friends_list = firebase.database().ref('friends/' + facebookId);

        return friends_list.once('value')
            .then(function (snapshot) {
                let friends = snapshot.val().friends_list;

                let split = friends.split(' ');

                app.processArray(split)
                return 0
            })
    }

    sortFeed (feed) {
      
        if(feed.length !== 0) {
            for (let i = 0; i < feed.length; i++) {
                this.state.feed.push(feed[i])
            }
        }
    }

    getFeed (user_key, name) {
        let app = this


        let db_seen = firebase.database().ref('users').child(user_key).child('seen')
        return db_seen.once('value')
            .then(function(snapshot) {
                let feed = []
                snapshot.forEach(function (data) {
                    let d = new Date(data.val().date)
                    let obj = {
                        id: data.val().id,
                        type: data.val().type,
                        user: name,
                        date: d
                    }
                    if(obj.id !== '')
                    feed.push(obj)
                })
                return app.sortFeed(feed)
            })
    }

    loadWithId (id) {
        let app = this
        let db_user = firebase.database().ref('users')
        return db_user.once('value') 
        .then(function(snapshot) { 
            snapshot.forEach(function (data) { 
                if (data.val().facebook_id === id) { 
                   return app.getFeed(data.key, data.val().name)
                }
            })
        })   
    }

    loadFeed () {
        let app = this
        let arr = []
        let promises = []

        for(let i = 0; i < app.state.feed.length; i++) {
            let o = app.state.feed[i]

            if (o.type === 'movie') {
                let request = 'http://' + api + '/movies/getMovieFromId/' + o.id
                promises.push( axios.get(request))
            }
            else if(o.type === 'show') {
                let request = 'http://' + api + '/shows/getShowFromId/' + o.id
                promises.push( axios.get(request))
            }
        }

        axios.all(promises).then(function(results) {


            for(let j = 0; j < results.length; j++) {
                let temp = app.state.feed[j]
                let obj= {
                    id: temp.id,
                    type: temp.type,
                    name: temp.user,
                    date: temp.date,
                    title: results[j].data.title
                }
                arr.push(obj) 
            }
           
            setTimeout(function(){

                console.log(arr)
                app.state.feed = arr
                }, 1500);
        })
    }

    test () {
        let user = firebase.auth().currentUser
        let app = this

        let aux = []
        let facebookId = ''
        let db_user = firebase.database().ref('users');
        return db_user.once('value')
                .then(function(snapshot) {
                    snapshot.forEach(function (data) {
                        if (data.val().email.toUpperCase() == user.email.toUpperCase()) {
                            return app.loadFriends(data.val().facebook_id)
                        }
                    })
                })
    }

    componentWillMount() {
        let app = this
        app.test()
        setTimeout(function(){

            app.loadFeed()
            setTimeout(function(){
                app.loadFeed()
                app.setState(
                    app.state
                )
                }, 3000);
            }, 3000);
    }

    render(){

        const {loading} = this.state;
        const searchText = <Text> Search </Text>;
        const loadingText = <Text> Loading... </Text>;
        const {feed} = this.state

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
                    <SearchBar lightTheme onChangeText={term => this.setState({term})} placeholder='Type Here...'/>
                   <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate('Result', {term: this.state.term})}>
                       <Text style={styles.textButton}>
                           {loading ? loadingText : searchText}
                       </Text>
                   </TouchableOpacity>
                   <Feed feed={feed} />
               </Content>
           </Container>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 140,
        alignSelf: 'center',
        borderRadius: 4,
        padding: 8,
        backgroundColor: '#119da4',
        marginTop: '2%',
    },
    textButton: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})