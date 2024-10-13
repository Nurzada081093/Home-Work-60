import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { DataTime, IMessage } from '../../../types';
import * as React from 'react';
import { useEffect } from 'react';

interface IMessageProps {
  message: IMessage;
}

const Message: React.FC<IMessageProps> = React.memo(
  ({ message }) => {
    console.log("[Message] render");

    useEffect(() => {
      console.log("[Message] mounted!");
    }, []);

    const dateFormat = (date: string) => {
      const d: Date = new Date(date);

      const addZero = (number: number): string => {
        return number < 10 ? "0" + number : "" + number;
      };

      const data: string = [
        addZero(d.getDate()),
        addZero(d.getMonth() + 1),
        d.getFullYear(),
      ].join(".");

      const time: string = [
        addZero(d.getHours()),
        addZero(d.getMinutes()),
        addZero(d.getSeconds()),
      ].join(":");

      return { data, time };
    };

    const dayTime: DataTime = dateFormat(message.datetime);

    return (
      <Card
        sx={{
          maxWidth: 600,
          mt: "20px",
          mb: "20px",
          backgroundColor: "whitesmoke",
        }}
      >
        <CardActionArea>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "rgba(197,202,233,0.84)",
              p: "10px 20px",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: 18 }}
            >
              {dayTime.data}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: 18 }}
            >
              {dayTime.time}
            </Typography>
          </CardActions>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: 22 }}
            >
              {message.author}
              <img
                style={{ marginLeft: "10px" }}
                width="30"
                height="30"
                src="https://img.icons8.com/office/30/user.png"
                alt="user"
              />
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", wordBreak: "break-word" }}
            >
              {message.message}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    return (
      nextProps.message.author === prevProps.message.author &&
      nextProps.message.message === prevProps.message.message &&
      nextProps.message.datetime === prevProps.message.datetime
    );
  },
);

export default Message;
