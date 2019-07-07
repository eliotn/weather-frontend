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
    fetch("http://localhost:8080/v1/mapbox/secret")
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({accessToken: result.value});
        this._updatePointData({"type":"Point", "coordinates":[0, 0]})
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

    this.setState({mapStyle});
    console.log("Updated point")
  }
  render() {
    if (this.state.accessToken) {
      return (
        <ReactMapGL
          {...this.state.viewport}
          mapStyle={this.state.mapStyle}
          mapboxApiAccessToken={this.state.accessToken}
          onViewportChange={(viewport) => this.setState({viewport})}
        />
      );
    }
    return null;
  }
}

  

//   render() {
//     const data = {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [
//           [0, 0]
//         ]
//       }
//     };
//     const { lng, lat, zoom, accessToken } = this.state;
//     console.log(accessToken);
//     if (accessToken) {
//     return (
      
//       <MapGL
//         style={{ width: '500px', height: '400px' }}
//         accessToken="pk.eyJ1IjoiZWxpb3RuIiwiYSI6ImNqeGwxYWwwYjAxZGEzeW8xcWZmODk0Z2cifQ.Z83L7DEbb865AlbProTd5g"
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         latitude={37.7577}
//         longitude={-122.4376}
//         zoom={0}
//         onViewportChange={viewport => {
//           // Call `setState` and use the state to update the map.
//         }}
//       >
//         <Source id='point' type='geojson' data={data} />
//   <Layer
//     id='point'
//     type='circle'
//     source='point'
//     layout={{}}
//     paint={{
//       "circle-radius": 100,
//       "circle-color": "#007cbf"
//       }}
//   />
//       </MapGL>
//       );
//     }
//     return null;
//   }
// }
