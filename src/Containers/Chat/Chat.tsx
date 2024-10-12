import Container from '@mui/material/Container';
import { GlobalStyles } from '@mui/material';
import FormElement from '../../Components/FormElement/FormElement.tsx';
import { IMessage } from '../../types';
import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const url: string = 'http://146.185.154.90:8000/messages';

  const request = async (url: string, method: string = "GET") => {
    const response= await fetch(url, {method: method});
    if (!response.ok) {
      throw new Error('Network Error: ' + response.status);
    }
    return response.json();
  };

  const getAllMessages = async () => {
    try {
      const allMessages = await request(url);
      console.log(allMessages);
    } catch (error) {
      alert(`Error ${error}`);
    }
  };

  void getAllMessages();

  const addNewMessage = (newMessage: IMessage) => {
    setMessages((prevState) => [...prevState, newMessage]);
  };

  console.log(messages);


  return (
    <>
      <GlobalStyles styles={{ body: { backgroundColor: 'lightblue', margin: 0 } }} />
        <Container maxWidth="sm" sx={{mt: 4}}>
          <div>
            <FormElement addNewMessage={addNewMessage}/>
            здесь будут все данные
          </div>
        </Container>
    </>
  );
};

export default Chat;