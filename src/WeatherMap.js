import React from 'react'
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {fromJS} from 'immutable';
import MAP_STYLE from './react-map-gl-default-style.json';


export default class WeatherMap extends React.Component {

  constructor() {
    super();
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 0
      },
      mapStyle: fromJS(MAP_STYLE)
    };
    this.pointLayer = fromJS({
      id: 'point',
      source: 'point',
      type: 'circle',
      paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf'
      }
    });
  }
  componentDidMount() {
    console.log(process.env.REACT_APP_WEATHER_BACKEND_URL);
    fetch(process.env.REACT_APP_WEATHER_BACKEND_URL + "/v1/mapbox/secret")
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({accessToken: result.value});
        
      })
      .catch(err => {
        console.log(err);
        this.setState({error : err})
      });
    fetch(process.env.REACT_APP_WEATHER_BACKEND_URL + "/v1/weather/randomLocations/1",
    {headers: {
      "Accept": "application/json"
    }})
      .then(res => res.json())
      .then(result => {
          console.log(result);
          let {locations} = result;
          this._updatePointData({"type":"Point", "coordinates":[locations[0].latitude, locations[0].longitude]})
        }
      )
      .catch(err => {
        console.log(err);
        this.setState({error : err})
      });

        
    
  };

  

  //https://github.com/uber/react-map-gl/blob/master/examples/geojson-animation/src/app.js
  _updatePointData = pointData => {
    let {mapStyle} = this.state;
    if (!mapStyle.hasIn(['sources', 'point'])) {
      mapStyle = mapStyle
        // Add geojson source to map
        .setIn(['sources', 'point'], fromJS({type: 'geojson'}))
        // Add point layer to map
        .set('layers', mapStyle.get('layers').push(this.pointLayer));
    }
    // Update data source
    mapStyle = mapStyle.setIn(['sources', 'point', 'data'], pointData);
    this.setState({mapStyle, hasPoints: true});
    console.log("Updated point")
  }


  render() {
    //only render the map when we have the access token and points are loaded
    if (this.state.accessToken && this.state.hasPoints) {
      return (
        <ReactMapGL
          {...this.state.viewport}
          mapStyle={this.state.mapStyle}
          mapboxApiAccessToken={this.state.accessToken}
          onViewportChange={(viewport) => this.setState({viewport})}
        />
      );
    }
    if (this.state.error) {
      return (<p>There was an error in loading weather data.</p> );
    }
    return (<p>Loading weather data please be patient...</p> );
  }
}