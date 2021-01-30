import React from 'react';
import logo from './logo.svg';
import './App.css';
import Api from './service/Api';
import Helper from './service/Helper';
var moment = require('moment'); // require

class Weather extends React.Component{

  constructor(props) {
    super(props);
    this.state = { isCelsius: true, city: "", weaterData: {}};
  }

  componentDidMount(){
    if(this.props.latitude){
      this.getWeather(`&lat=${this.props.latitude}&lon=${this.props.longitude}`);
    }else{
      this.getWeather(`&city=${this.props.city}`);
    }
    
  }

  getWeather = (param) => {
    Api.get(`&key=aeb457af85ae4137a793836a8b564996&days=7${param}`).then((response) => {
      console.log(response);
      this.setState({ weaterData: response.data });
		}).catch((error) => {
			alert('Internal server error');
			console.log(error);
		});
  }

  swichType = (bool) => {
    this.setState({ isCelsius: bool });
  }

  getByCity = () => {
    this.getWeather(`&city=${this.state.city}`);
  }

  render(){
    const { weaterData, isCelsius } = this.state;
    if(weaterData.data){
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{paddingLeft: 30}}>
              <p style={{color: "#636363", fontSize: 40,lineHeight: 0, fontWeight: 'bold'}}> {weaterData.city_name} </p>
              <p style={{color: "#636363", fontSize: 20,lineHeight: 1, }}> {Helper.day(weaterData.data[0].valid_date, 3)}, {moment(weaterData.data[0].valid_date).format('MMMM Do')} </p>
              <p style={{color: "#636363", fontSize: 20,lineHeight: 0, }}> {weaterData.data[0].weather.description} </p>
            </div>


            <div style={{marginTop: 30}}>

            <input type="text" name="name" onChange={event => this.setState({ city: event.target.value })} placeholder="Enter City Name"/>
            <input type="submit" value="Submit" onClick={() => this.getByCity()}/>


              <div style={{ display: 'flex', flexDirection: 'row', width: 100, justifyContent: 'space-between', marginTop: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <input type="radio" value="option1" checked={isCelsius} onClick={() => this.swichType(true)}/>
                  <span style={{color: '#444444'}}> &#176; C </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <input type="radio" value="option1" checked={!isCelsius} onClick={() => this.swichType(false)}/>
                  <span style={{color: '#444444'}}> &#176; F </span>
                </div>
              </div>
            </div>
            
          </div>
          

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}> 
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '50%' }}>
              <img src={`https://www.weatherbit.io/static/img/icons/${weaterData.data[0].weather.icon}.png`} alt={weaterData.data[0].weather.description}></img>
              <p style={{fontSize: 45, color: "#626262", paddingLeft: 5}}>{Helper.getTemp(weaterData.data[0].temp, isCelsius)}</p> <span style={{color: "#636363"}}>&#176; {isCelsius? "C": "F"}</span>
            </div>

            <div style={{ width: '50%' }}>
              <p style={{color: "#878787", lineHeight: 0}}>Precipitation: <span style={{color: '#444444'}}>{weaterData.data[0].pop}% </span></p>
              <p style={{color: "#878787", lineHeight: 2}}>Humidity: <span style={{color: '#444444'}}>{weaterData.data[0].rh}%</span> </p>
              <p style={{color: "#878787", lineHeight: 0}}>Wind: <span style={{color: '#444444'}}>{(weaterData.data[0].wind_spd).toFixed(2)} {weaterData.data[0].wind_cdir_full}</span></p>
              <p style={{color: "#878787", lineHeight: 2}}>UV Index: <span style={{color: '#444444'}}>{(weaterData.data[0].uv).toFixed(2)}</span> </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>

            {weaterData.data.map((res, i) => (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 150 }}>
                <p style={{textAlign: 'center', fontSize: 18, color: "#626262", fontWeight: 'bold'}}> {Helper.day(res.valid_date, i)} </p>
                <img src={`https://www.weatherbit.io/static/img/icons/${res.weather.icon}.png`} alt={res.weather.description}></img>

                <div style={{ flexDirection: 'row', }}>
                  <span style={{fontSize: 18, color: "#444444", fontWeight: 'bold'}} alt="High">{Helper.getTemp(res.max_temp, isCelsius)}&#176; &nbsp;</span>
                  <span style={{fontSize: 18, color: "#626262"}} alt="Low">{Helper.getTemp(res.min_temp, isCelsius)}&#176;</span>
                </div>

                <div style={{ flexDirection: 'row', }}>
                  <p style={{color: "#878787", lineHeight: 0}}>Humidity: <span style={{color: '#444444'}}>{res.rh}%</span> </p>
                </div>

              </div>
            ))}
              
          </div>

        </div>
    )}else{
      return(
      <p>Loading...</p>
      )
    }
  }
}

export default Weather;
