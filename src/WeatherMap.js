import React from 'react'
import ReactMapGL, {Marker} from 'react-map-gl';
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
    
    Promise.all([
      fetch(process.env.REACT_APP_WEATHER_BACKEND_URL + "/v1/mapbox/secret"),
      fetch(process.env.REACT_APP_WEATHER_BACKEND_URL + "/v1/weather/randomLocations/10",
    {headers: {
      "Accept": "application/json"
    }})])
    //need to resolve all json first https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(([secret, weatherlocations]) => {
        console.log(weatherlocations);
        
        this.setState({accessToken: secret.value, points: weatherlocations.locations});
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
        this.setState({error : err})
      });

        
    
  };


  render() {
    //only render the map when we have the access token and points are loaded
    if (this.state.accessToken && this.state.points) {
      //make a marker for each point displaying the weather on the map
      return (
        <ReactMapGL
          {...this.state.viewport}
          mapStyle={this.state.mapStyle}
          mapboxApiAccessToken={this.state.accessToken}
          onViewportChange={(viewport) => this.setState({viewport})}
        >
          {this.state.points.map((value, index) => {
            return <Marker latitude={value.latitude} longitude={value.longitude} offsetLeft={-20} offsetTop={-20}>
            <img src={value.weatherIcon} alt={value.weather} width={40} height={40}></img>
            </Marker>
          })}
        </ReactMapGL>
      );
    }
    if (this.state.error) {
      return (<p>There was an error in loading weather data.</p> );
    }
    return (<p>Loading weather data please be patient...</p> );
  }
}