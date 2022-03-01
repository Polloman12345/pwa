import {Button} from "@mui/material";
import { useNotifications } from './hooks/useNotifications';

export const SignalRNotifications = ({text, notifier}) =>{
  //return <></>
  const notify = useNotifications(notifier);
  return <Button onClick={() =>notify(text)}>Enviar SIGNAL</Button>
}
