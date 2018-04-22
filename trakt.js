import React from 'react';

 class Trakt extends React.Component {

    searchMovie = term =>{
        console.log("Trakt received " + term);
        // trakt.search.text({
            //   query: term,
            //   type: 'movie'
            // }).then(response => {
            //   // Contains Array[] response from API (search data)
        // });
        //return response;
    }

}
const trakt = new Trakt();
module.exports =  trakt;