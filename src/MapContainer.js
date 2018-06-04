import React, { Component } from 'react';
import ReactDOM from 'react-dom'

 class MapContainer extends Component {

  state = {
     markers: [] ,
     img: []
  }

  componentDidMount() {
    this.loadMap();
    this.imageLoader();
  }

  componentDidUpdate(){

    if(this.props.queryChanger.length > 1){
      this.markers();
    }
  }

componentWillUpdate(){
     this.markers();

}

imageLoader = (querySearch) => {

    fetch("https://api.unsplash.com/search/photos?page=1&query=" + querySearch ,{
     headers: {
         Authorization: "Client-ID fa7b4d3f7a1cf70d22c9d0fe4446294f729e8fd1dfacd72f7582e81b593be383"
         }
    }).then(data => data.json()
    ).then(data => {
     console.log(data.results[0].urls.thumb);

   this.state.img.push(data.results[0].urls.thumb)
    }).catch(err => {

    console.log("image not found " + err)}

      ); }

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
     this.state.markers.map(data  => this.map.getBounds().contains(data.position) ? data.setMap(null) : "");
    let bounds = new google.maps.LatLngBounds();
      this.props.allMarkers.map(loc   => {
      const marker = new google.maps.Marker({
      position: loc.location,
      title: loc.title,
      map: this.map ,
      animation: google.maps.Animation.DROP
      });
      console.log(this.state.img);
      bounds.extend(loc.location);
      let infoWin = new google.maps.InfoWindow({
        content: ` <img src="${this.state.img[0]}" alt="${loc.title}" height="42" width="42">   <p>${loc.title} </p>`
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