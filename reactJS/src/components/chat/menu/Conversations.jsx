import { useState, useEffect, useContext } from "react";

import { Box, styled, Divider } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";

//components
import Conversation from "./Conversation";

const Component = styled(Box)`
  overflow: overlay;
  height: 81vh;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
`;

const Conversations = ({ text }) => {
  const { account, socket, setActiveUsers, users } = useContext(AccountContext);

  return (
    <Component>
      {users?.map((user, i) => (
        <>
          <Conversation user={user} />
          {users.length !== i + 1 && <StyledDivider />}
        </>
      ))}
    </Component>
  );
};

export default Conversations;
