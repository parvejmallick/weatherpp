import React from 'react';
import logo from './logo.svg';
import './App.css';
import { geolocated } from "react-geolocated";
import Weather from './Weather';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = { city: "", showWeatherByCity: false};
  }

  getByCity = () => {
    this.setState({ showWeatherByCity: true });
  }

  render(){
  return (
      !this.props.isGeolocationAvailable ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <p>Your browser does not support Geolocation</p>

          <div style={{marginTop: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <input type="text" name="name" onChange={event => this.setState({ city: event.target.value })} placeholder="Enter City Name"/>
            <input type="submit" value="Submit" onClick={() => this.getByCity()}/>
          </div>

        </div>
      ) : !this.props.isGeolocationEnabled && !this.state.showWeatherByCity ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <p>Geolocation is not enabled</p>

          <div style={{marginTop: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <input type="text" name="name" onChange={event => this.setState({ city: event.target.value })} placeholder="Enter City Name"/>
            <input type="submit" value="Submit" onClick={() => this.getByCity()}/>
          </div>
          
        </div>
      ) : this.props.coords || this.state.showWeatherByCity ? (
          <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {/* <p>{this.props.coords.latitude}</p> */}
            <Weather latitude={this.props.coords ? this.props.coords.latitude : null} longitude={this.props.coords ? this.props.coords.longitude : null} city={this.state.city}/>
          </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <p>Getting current location &hellip; </p> 
        </div>
      )
  );
  
  }
}

// export default App;

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
