import Container from '@mui/material/Container';
import { GlobalStyles } from '@mui/material';
import FormElement from '../../Components/FormElement/FormElement.tsx';
import { IMessage } from '../../types';
import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

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