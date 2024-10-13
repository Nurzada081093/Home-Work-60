import Message from './Message/Message.tsx';
import { IMessage } from '../../types';
import * as React from 'react';
import { useEffect } from 'react';

interface IMessagesProps {
  messages: IMessage[];
}

const Messages: React.FC<IMessagesProps> = ({messages}) => {
  console.log('[Messages] render');

  useEffect(() => {
    console.log('[Messages] mounted!');
  }, []);

  return (
    messages.map((message) => (
      <Message key={message._id} message={message}/>
    ))
  );
};

export default Messages;