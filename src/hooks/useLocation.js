import { useEffect, useState } from "react";

const getLocation = () => {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
  }
  
  const useLocation = () => {
    const [currentLocation, setCurrentLocation] = useState();
    useEffect(() => getLocation().then(setCurrentLocation), []);
  
    return currentLocation;
  }
  
  export default useLocation;