import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { useEffect, useState } from "react";
export const useNotifications = () => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
      const connect = new HubConnectionBuilder()
        .withUrl("https://pwaserverapi.azure-api.net/hubs/notifications")
        // .withUrl("https://localhost:5001/hubs/notifications")
        .withAutomaticReconnect()
        .build();
  
      setConnection(connect);
    }, []);
  
    useEffect(() => {
      if (connection) {
        connection
          .start()
          .then(() => {
            connection.on("ReceiveMessage", (message) => {
                debugger;
            //   notification.open({
            //     message: "New Notification",
            //     description: message,
            //   });
            });
          })
          .catch((error) => console.log(error));
      }
    }, [connection]);
  
    const sendMessage = async (text) => {
      if (connection) await connection?.send("SendMessage", text);
    };

    return sendMessage;
  };