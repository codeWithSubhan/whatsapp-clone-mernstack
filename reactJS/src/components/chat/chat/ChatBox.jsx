import { useContext, useState, useEffect } from "react";

import { Box } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { UserContext } from "../../../context/userProvider";
import { getConversation } from "../../../services/api";

const ChatBox = () => {
  const { person } = useContext(UserContext);
  const { account } = useContext(AccountContext);
  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({
        senderId: account.sub,
        receiverId: person.sub,
      });
      setConversation(data);
    };
    getConversationDetails();
  }, [person.sub]);

  console.log("Conversation Details:", conversation);

  return (
    <Box>
      <ChatHeader person={person} />
      <Messages person={person} conversation={conversation} />
    </Box>
  );
};

export default ChatBox;
