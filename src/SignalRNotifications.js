import {Button} from "@mui/material";
import { useNotifications } from './hooks/useNotifications';

export const SignalRNotifications = ({text}) =>{
  //return <></>
  const notify = useNotifications();
  return <Button onClick={() =>notify(text)}>Enviar SIGNAL</Button>
}
