import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import DateTime from './components/DateTime'
import WeatherScroll from './components/WeatherScroll'
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri:"https://th.bing.com/th/id/R.3069fb6db3eaa9c1975b12d4faf9ed83?rik=a3DLhy4zRKrZeg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f03%2f10%2f343196-landscape-nature-Iceland.jpg&ehk=QbRNhfYvGXTZ9d9617Km8tFgN9bHZhgViG2l332B1gw%3d&risl=&pid=ImgRaw&r=0"}} style={styles.image} >
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <WeatherScroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  }
});