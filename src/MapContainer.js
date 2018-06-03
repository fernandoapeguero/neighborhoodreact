import React, { Component } from 'react';
import ReactDOM from 'react-dom'

 class MapContainer extends Component {

  state = {
     markers: [] ,
     img: []
  }

  componentDidMount() {
    this.loadMap();

  }

  componentDidUpdate(){

    if(this.props.length > 1){
      this.state.markers.map( data => this.map.getBounds().contains(data.position) ? data.setMap(null) : "");
      this.state.markers.map(data => data.title.toLowerCase().includes(this.props.queryChanger.toLowerCase()) ? data.setMap(this.map) : data.setMap(null));
    }
  }

componentWillUpdate(){
     this.markers();

}

  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node
      const mapConfig = Object.assign({}, {
        center: {lat: 40.7485722, lng: -74.0068633}, // sets center of google map to NYC.
        zoom: 10, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap',
        maxZoom: 18 // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig);
      this.markers();
    }
  }


  markers = () =>{

    const {google} = this.props; // sets props equal to google
     this.state.markers.map( data => this.map.getBounds().contains(data.position) ? data.setMap(null) : "");
    let bounds = new google.maps.LatLngBounds();
      this.props.allMarkers.map(loc   => {
      const marker = new google.maps.Marker({
      position: loc.location,
      title: loc.title,
      map: this.map ,
      animation: google.maps.Animation.DROP
      });

      bounds.extend(loc.location);
      let infoWin = new google.maps.InfoWindow({
        content: `<p>${loc.title} </p>`
      });
      this.state.markers.push(marker);

      let currentMarker = "";
      marker.addListener('click' , function(){
           this.setAnimation(google.maps.Animation.BOUNCE);
           infoWin.open(this.map , this);
           currentMarker = this;

      });

      google.maps.event.addListener(infoWin,'closeclick',function(){
        currentMarker.setAnimation(null); //removes the marker
        // then, remove the infowindows name from the array
     });

     })// creates a new Google map on the specified node (ref='map') with the specified configuration set above.
    this.map.fitBounds(bounds);
  }

  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: this.props.mapWidth, // 90vw basically means take up 90% of the width screen. px also works.
      height: '96vh',
       // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    return ( // in our return function you must return a div with ref='map' and style.
      <div tabIndex="0" aria-label="google map" ref="map" style={style}>
        loading map...

      </div>
    )
  }
}

export default MapContainer