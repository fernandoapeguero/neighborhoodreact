
import React, { Component , ReactDOM} from 'react';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react'
// import child component
import MapContainer from './MapContainer'


class App extends Component {

  state = {
     containerWidth: "0" ,
       locations: [{
        title: "Riverside Park",
        location: {
            lat: 40.867153,
            lng: -73.871381
        }
    },
    {
        title: "la marina",
        location: {
            lat: 40.868745,
            lng: -73.931965
        }
    },
    {
        title: "central park",
        location: {
            lat: 40.782471,
            lng: -73.966578
        }
    },
    {
        title: "Orchard Beach",
        location: {
            lat: 40.867144,
            lng: -73.794647
        }
    },
    {
        title: "Micro Center",
        location: {
            lat: 40.924946,
            lng: -73.856999
        }
    },
    {
        title: "Times Square",
        location: {
            lat: 40.758791,
            lng: -73.985143
        }
    },
    {
        title: "Sylvia's Restaurant of Harlem ",
        location: {
            lat: 40.808666,
            lng: -73.944589
        }
    },
    {

        title: "Microsoft Technology Center ",
        location: {
            lat: 40.756674,
            lng: -73.989900
        }
    }, {
        title: "La Casa del Mofongo",
        location: {
            lat: 40.850363,
            lng: -73.933332
        }
    },
    {
        title: "Spa Castle ",
        location: {
            lat: 40.787391,
            lng: -73.836811
        }
    }
  ] ,
  query : "" ,
  markers: [] ,
  mapWiddth: 100+"%"

  }

  openDrawer = () =>{
  this.setState({containerWidth: "250px" , mapWidth:70+"%"})
  }

  closeDrawer = () => {

    this.setState({mapWidth: 100 +"%" , containerWidth: 0})
  }

  onQueryUpdate = (query , event) => {
    this.setState({query: query })
  }
  render() {


    return (

           <div id="side-menu">
               <div  id="container" style={{width: this.state.containerWidth , height:"100vh"}}>
                    <div className="top-bar">
                            <h2 >Neighborhood Map <span onClick={this.closeDrawer} id="close-sidemenu">x</span></h2>
                        </div>
                        <div id="my-side-nav" className="side-nav">
                            <input id="search-field" type="search" value={this.state.query} onChange={(event) => this.onQueryUpdate(event.target.value)} placeholder="Search" className="searcher"/>
                            <input id="filter-button" type="button" value="Filter" className="filter-button" />
                        </div>
                      <div >
                            <ul id="listview" style={{marginTop: "20px"}}>

                              { this.state.locations.map(element => {
                                  return `${element.title}`
                              }) }

                                </ul>
                      </div>

               </div>

            <div onClick={this.openDrawer} className="nav-opener-holder"><span id="navigation-open" >&#9776; open</span> </div>
           <div className="mapHolder">
             <MapContainer markerHolder={this.state.markers} google={this.props.google}  allMarkers={this.state.locations} mapWidth={this.mapWidth}/>
             </div>
        </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCslphJBfyRxmRvdoo8kmjaUSwW4f38PU',
})(App)