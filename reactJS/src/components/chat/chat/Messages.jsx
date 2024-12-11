import { useState, useEffect, useContext, useRef } from "react";
import { Box, styled } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";

import Footer from "./Footer";
import Message from "./Message";
import { postData } from "../../../utils/helper";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { BASE_URL } from "../../../constants/data";

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;

const StyledFooter = styled(Box)`
  height: 55px;
  background: #ededed;
  // position: absolute;
  width: 100%;
  // bottom: 0
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: auto;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

let socket, selectedChatCompare;

const Messages = ({ conversation }) => {
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [value, setValue] = useState();
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  const scrollRef = useRef();

  const {
    account,
    isAuth,
    newMessageFlag,
    setNewMessageFlag,
    person,
    messages,
    setMessages,
    chatId,
    userData,
  } = useContext(AccountContext);

  const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if (!value || code !== 13) return;

    const message = {
      chatId: chatId,
      content: value,
    };

    try {
      const res = await postData("messages", isAuth.token, message);

      setMessages((prev) => [...prev, res.data]);
      socket.emit("new message", res.data);
      console.log(res.data);
    } catch (err) {
      toast.error(err.message);
    }

    setValue("");
    // setNewMessageFlag((prev) => !prev);
  };

  useEffect(() => {
    socket = io(BASE_URL);
    socket.emit("setup", userData);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    if (!chatId) return;
    selectedChatCompare = chatId;
    socket.emit("join chat", chatId);
  }, [chatId]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log("newMessageRecieved", newMessageRecieved);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare !== newMessageRecieved.chat._id
      ) {
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message) => (
            <Container ref={scrollRef}>
              <Message message={message} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        value={value}
        setValue={setValue}
        setFile={setFile}
        file={file}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;
