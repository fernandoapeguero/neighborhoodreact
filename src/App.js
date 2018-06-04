
import React, { Component , ReactDOM} from 'react';
import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react'
// import child component
import MapContainer from './MapContainer'

import List from './listView'


class App extends Component {

  state = {
      containerWidth: "0",
      locations: [{
              title: "Riverside Park",
              location: {
                  lat: 40.867153,
                  lng: -73.871381
              },
              id: 0
          },
          {
              title: "la Marina",
              location: {
                  lat: 40.868745,
                  lng: -73.931965
              },
              id: 1
          },
          {
              title: "Central Park",
              location: {
                  lat: 40.782471,
                  lng: -73.966578
              },
              id: 2
          },
          {
              title: "Orchard Beach",
              location: {
                  lat: 40.867144,
                  lng: -73.794647
              },
              id: 3
          },
          {
              title: "Micro Center",
              location: {
                  lat: 40.924946,
                  lng: -73.856999
              },
              id: 4
          },
          {
              title: "Times Square",
              location: {
                  lat: 40.758791,
                  lng: -73.985143
              },
              id: 5
          },
          {
              title: "Sylvia's Restaurant of Harlem ",
              location: {
                  lat: 40.808666,
                  lng: -73.944589
              },
              id: 6
          },
          {

              title: "Microsoft Technology Center ",
              location: {
                  lat: 40.756674,
                  lng: -73.989900
              },
              id: 7
          }, {
              title: "La Casa del Mofongo",
              location: {
                  lat: 40.850363,
                  lng: -73.933332
              },
              id: 8
          },
          {
              title: "Spa Castle ",
              location: {
                  lat: 40.787391,
                  lng: -73.836811
              },
              id: 9
          }
      ],
      query: "",
      mapWidth: 100 + "%",
      searchTerm: "" ,
      displayVisibility: ""

  }

  componentWillMount() {

    setTimeout(() => {
        this.openDrawer();
    }, 1000);
  }

  onKeyDown = (e) => {
      if (e.keyCode === 8) {
          this.setState({
              searchTerm: "",
              query: ""
          })
      }
  }

  openDrawer = () => {
      this.setState({
          displayVisibility: "",
          containerWidth: "250px",
          mapWidth: 70 + "%"
      });
  }

  closeDrawer = () => {

      this.setState({
          mapWidth: 100 + "%",
          containerWidth: "0" ,
          displayVisibility: "none"
      });
  }

  onQueryUpdate = (query) => {
      this.setState({
          query: query
      })
  }

  updateSearchTerm = () => {

      this.setState({
          searchTerm: this.state.query
      });
  }

  updateListItem = (listTitle) => {

    this.onQueryUpdate(listTitle);
      this.setState({
          searchTerm: listTitle,
          query: listTitle
      })
  }

  render() {

    return (

           <div id="side-menu">
               <aside  id="container" style={{width: this.state.containerWidth , height:"100vh" , display: this.state.displayVisibility }}>
                    <div className="top-bar">
                            <h2 >Neighborhood Map <span tabIndex="0" role="button" aria-label="close side menu" onKeyPress={this.closeDrawer} onClick={this.closeDrawer} id="close-sidemenu">x</span></h2>
                        </div>
                        <div  id="my-side-nav" className="side-nav">
                            <input  role="searchbox" id="search-field" type="text"  value={this.state.query} onChange={(event) => this.onQueryUpdate(event.target.value)} placeholder="Filter places" onKeyDown={(e) => this.onKeyDown(e)} />
                            <input  id="filter-button" type="button" value="Filter" className="filter-button" onClick={this.updateSearchTerm}/>
                        </div>
                      <div>
                       <List someMark={this.state.locations.filter(data => data.title.toLowerCase().includes(this.state.query.toLowerCase().trim() ))} updateMarkersList={this.updateListItem}/>
                      </div>

               </aside>
            <div tabIndex="1"  onKeyDown={this.openDrawer} onClick={this.openDrawer} className="nav-opener-holder"><span id="navigation-open" role="button" aria-label="open side menu" >&#9776; open</span> </div>
           <div tabIndex="-1" className="mapHolder">
             <MapContainer  queryChanger={this.state.searchTerm} google={this.props.google}  allMarkers={this.state.locations.filter(data => data.title.toLowerCase().includes(this.state.query.toLowerCase().trim() ))}  mapWidth={this.mapWidth}/>
             </div>
        </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBCslphJBfyRxmRvdoo8kmjaUSwW4f38PU',
})(App)