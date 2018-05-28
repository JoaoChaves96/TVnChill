import React from 'react';

 class Trakt extends React.Component {

    searchMovie = term =>{
        console.log("Trakt received " + term);
        
    }

}
const trakt = new Trakt();
module.exports =  trakt;