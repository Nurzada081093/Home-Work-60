import Container from '@mui/material/Container';
import { GlobalStyles } from '@mui/material';
import FormElement from '../../Components/FormElement/FormElement.tsx';
import { IMessage } from '../../types';
import { useEffect, useState } from 'react';
import Messages from '../../Components/Messages/Messages.tsx';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const url: string = 'http://146.185.154.90:8000/messages';

  const request = async (url: string, method: string = "GET") => {
    const response= await fetch(url, {method: method});
    if (!response.ok) {
      throw new Error('Network Error: ' + response.status);
    }
    const data = await response.json();
    return setMessages(data);
  };

  useEffect(() => {
    if (messages.length === 0) {
      void request(url);
    }
  }, [messages]);


  const addNewMessage = (newMessage: IMessage) => {
    setMessages((prevState) => [...prevState, newMessage]);
  };

  return (
    <>
      <GlobalStyles styles={{
        body: {
          background: 'url("https://img.freepik.com/free-vector/gradient-spheres-background_52683-76367.jpg?size=626&ext=jpg&ga=GA1.1.1425989515.1728691200&semt=ais_hybrid") no-repeat center center fixed',
          backgroundSize: 'cover',
        }
      }} />
        <Container maxWidth="sm" sx={{mt: 4}}>
          <div>
            <FormElement addNewMessage={addNewMessage}/>
            <Messages messages={messages}/>
          </div>
        </Container>
    </>
  );
};

export default Chat;


