import Container from '@mui/material/Container';
import { GlobalStyles } from '@mui/material';
import FormElement from '../../Components/FormElement/FormElement.tsx';
import { IMessage, INewMessage } from '../../types';
import { useEffect, useState } from 'react';
import Messages from '../../Components/Messages/Messages.tsx';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastDatetime, setLastDatetime] = useState<string>("");

  const url = "http://146.185.154.90:8000/messages";

  const request = async (url: string, method: string = "GET") => {
    const response = await fetch(url, { method });
    if (!response.ok) {
      throw new Error("Network Error: " + response.status);
    }
    return await response.json();
  };

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const data = await request(url);
        if (data.length > 0) {
          setMessages(data);
          setLastDatetime(data[data.length - 1].datetime);
        }
      } catch (error) {
        alert(error);
      }
    };

    void getAllMessages();
  }, []);

  useEffect(() => {
    const fetchNewMessages = async () => {
      try {
        const data = await request(`${url}?datetime=${lastDatetime}`);
        if (data.length > 0) {
          const wholeMessages = [...messages, ...data];
          wholeMessages.sort(
            (a, b) =>
              new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
          );
          setMessages(wholeMessages);
          setLastDatetime(data[data.length - 1].datetime);
        }
      } catch (error) {
        alert(error);
      }
    };

    const interval = setInterval(fetchNewMessages, 3000);
    return () => clearInterval(interval);
  }, [lastDatetime, messages]);

  const addNewMessage = (newMessage: INewMessage) => {
    const data = new URLSearchParams();
    data.set("message", newMessage.message);
    data.set("author", newMessage.author);

    const sendNewMessage = async () => {
      try {
        await fetch(url, {
          method: "post",
          body: data,
        });
      } catch (error) {
        alert(error);
      }
    };

    void sendNewMessage();
  };

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            background:
              'url("https://bogatyr.club/uploads/posts/2023-03/thumbs/1679357524_bogatyr-club-p-oboi-na-rabochii-stol-temno-zelenie-foni-i-1.jpg") no-repeat center center fixed',
            backgroundSize: "cover",
          },
        }}
      />
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <div>
          <FormElement addNewMessage={addNewMessage} />
          <Messages messages={messages} />
        </div>
      </Container>
    </>
  );
};

export default Chat;
