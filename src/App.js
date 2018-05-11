
import React, { Component , ReactDOM} from 'react';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react'
// import child component
import MapContainer from './MapContainer'

class App extends Component {

  state = {
     containerWidth: "0"
  }

  openDrawer = () =>{
  this.setState({containerWidth: "250px"})
  }

  closeDrawer = () => {

    this.setState({closeDrawer: "0"})
  }

  render() {
    return (

           <div id="side-menu">
               <div  id="container" style={{width: this.state.containerWidth , height:"100vh"}}>
                    <div className="top-bar">
                            <h1 >Neighborhood Map <span onClick={this.closeDrawer} id="close-sidemenu">x</span></h1>
                        </div>
                        <div id="my-side-nav" className="side-nav">
                            <input id="search-field" type="search" placeholder="Search" className="searcher"/>
                            <input id="filter-button" type="button" value="Filter" className="filter-button"/>
                        </div>
                      <div id="listview">
                            <ul>
                                </ul>
                      </div>

               </div>

            <div onClick={this.openDrawer} className="nav-opener-holder"><span id="navigation-open" >&#9776; open</span> </div>
           <div className="mapHolder">
             <MapContainer google={this.props.google} />
             </div>
        </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCslphJBfyRxmRvdoo8kmjaUSwW4f38PU',
})(App)