import { useContext, useState, useEffect } from "react";

import { Box } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { UserContext } from "../../../context/userProvider";
import { getConversation } from "../../../services/api";

const ChatBox = () => {
  return (
    <Box>
      <ChatHeader />
      <Messages />
    </Box>
  );
};

export default ChatBox;
