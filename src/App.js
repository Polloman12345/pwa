import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={displayNotification}></button>
      </header>
    </div>
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
    // We are storing the service worker, globally
    swRegistration = swReg;
  })
  .catch(error => {
    console.error('Service Worker Error', error);
  });
}

function displayNotification() {
  //Ask user if we show notifications
  if (window.Notification && Notification.permission === 'granted') {
    notification();
    // We will crete this function in a further step.
  }
  // If the user hasn't told whether he wants to be notified or not
  // Note: because of Chrome, we cannot be sure the permission property
  // is set, therefore it's unsafe to check for the "default" value.
  else if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(status => {
      if (status === 'granted') {
        notification();
      } else {
        alert('You denied or dismissed permissions to notifications.');
      }
    });
  } else {
    // If the user refuses to get notified
    alert(
      'You denied permissions to notifications. Please go to your browser or phone setting to allow notifications.'
    );
  }
}

function notification() {
  const options = {
    body: 'Testing Our Notification',
    icon: './logo192.png'
  };
  swRegistration.showNotification('PWA Notification!', options);
}

export default App;
