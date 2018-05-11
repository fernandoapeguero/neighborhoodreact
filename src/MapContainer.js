import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class MapContainer extends Component {


   state = {
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
]
   }



  componentDidMount() {
    this.loadMap(); // call loadMap function to load the google map
  }

  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign({}, {
        center: {lat: 40.7485722, lng: -74.0068633}, // sets center of google map to NYC.
        zoom: 11, // sets zoom. Lower numbers are zoomed further out.
        mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
      })

      this.map = new maps.Map(node, mapConfig);
      let bounds = new google.maps.LatLngBounds();

      this.state.locations.forEach(loc => {
        const marker = new google.maps.Marker({
        position: loc.location,
        title: loc.title,
        map: this.map ,
        animation: google.maps.Animation.DROP
        })

        bounds.extend(loc.location);

        let infoWindow = new google.maps.InfoWindow({
          content: loc.title
        })

        let infoWIndow = new google.maps.InfoWindow({
          content: loc.title,

        });

        marker.addListener('click',function(){
          infoWindow.open(this.map , this);
        })

      })// creates a new Google map on the specified node (ref='map') with the specified configuration set above.

      this.map.fitBounds(bounds);
    }
  }


  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '100%', // 90vw basically means take up 90% of the width screen. px also works.
      height: '100vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    return ( // in our return function you must return a div with ref='map' and style.
      <div ref="map" style={style}>
        loading map...
      </div>
    )
  }
}