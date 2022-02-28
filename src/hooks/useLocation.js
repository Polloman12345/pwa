import { useEffect, useState } from "react";

const getLocation = () => {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    }).then((position) => {
        debugger;
        return {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        //calculateDistance: (latitude, longitude) => Math.round(calcCrow(position.coords.latitude, position.coords.longitude, latitude, longitude) * 100) / 100
    }});
  }
  
  const useLocation = () => {
    const [currentLocation, setCurrentLocation] = useState();
    useEffect(() => getLocation().then((o) => { debugger;setCurrentLocation(o)}), []);
  
    return currentLocation;
  }
  
  export default useLocation;