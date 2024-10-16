import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import { Box } from '@mui/joy';
import * as React from 'react';
import { useState } from 'react';
import { INewMessage } from '../../types';

interface IProps {
  addNewMessage: (newMessage: INewMessage) => void;
}

const FormElement: React.FC<IProps> = ({ addNewMessage }) => {
  const [newMessage, setNewMessage] = useState<INewMessage>({
    message: "",
    author: "",
  });

  const getNewMessage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewMessage((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const createNewMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      newMessage.author.trim().length === 0 &&
      newMessage.message.trim().length === 0
    ) {
      alert("Fill in all the fields!");
    } else {
      addNewMessage({
        ...newMessage,
      });

      setNewMessage({ author: "", message: "" });
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 10,
        p: "19px",
        backgroundColor: "rgba(157,165,163,0.68)",
      }}
    >
      <form onSubmit={createNewMessage}>
        <Stack spacing={1}>
          <Input
            type="text"
            value={newMessage.author}
            id="author"
            name="author"
            onChange={getNewMessage}
            required
            placeholder="Enter your name..."
          />
          <Textarea
            value={newMessage.message}
            id="message"
            name="message"
            onChange={getNewMessage}
            required
            placeholder="Enter your message..."
            minRows={3}
          />
          <Button type="submit">Send</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FormElement;
