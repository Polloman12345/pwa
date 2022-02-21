import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {TextField, Button, createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [notificationText, setNotificationText] = useState("");
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <TextField value={notificationText} onChange={(e) => setNotificationText(e.target.value)}></TextField>
          <Button onClick={() =>displayNotification(notificationText)}>Enviar Notificacion</Button>
        </header>
      </div>
    </ThemeProvider>
  );
}
let swRegistration = null;
var swLocation = "./sw.js";
if (navigator.serviceWorker) {
  var url = window.location.href;

  if (url.includes("localhost")) {
    swLocation = "./pwa/sw.js";
  }
  navigator.serviceWorker.register(swLocation).then(swReg => {
    console.log('Service Worker is registered', swReg);
    swRegistration = swReg;
  })
  .catch(error => {
    console.error('Service Worker Error', error);
  });
}

function displayNotification(notificationText) {
  if (window.Notification && Notification.permission === 'granted') {
    createNotification(notificationText);
    return;
  }
  
  if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(status => status === 'granted' ? createNotification(notificationText) : alert('You denied or dismissed permissions to notifications.'));
    return;
  }
  alert(
    'You denied permissions to notifications. Please go to your browser or phone setting to allow notifications.'
  );
}

function createNotification(text) {
  const options = {
    body: text,
    icon: './logo192.png'
  };
  swRegistration.showNotification("PWA NOTIFICATION!!!", options);
}

export default App;
