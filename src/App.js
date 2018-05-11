
import React, { Component } from 'react';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react'
// import child component
import MapContainer from './MapContainer'
class App extends Component {
  render() {
    return (

   <div id="side-menu">
               <div id="container">
                    <div class="top-bar">
                            <h1>Neighborhood Map <span id="close-sidemenu">x</span></h1>
                        </div>
                        <div id="my-side-nav" class="side-nav">
                            <input id="search-field" type="search" placeholder="Search" class="searcher"/>
                            <input id="filter-button" type="button" value="Filter" class="filter-button"/>
                        </div>
                      <div id="listview">
                            <ul>
                                </ul>
                      </div>

               </div>

            <div class="nav-opener-holder"><span id="navigation-open" >&#9776; open</span> </div>

             <MapContainer google={this.props.google} />
        </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCslphJBfyRxmRvdoo8kmjaUSwW4f38PU',
})(App)