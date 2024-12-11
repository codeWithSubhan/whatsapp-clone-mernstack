import { useContext, useEffect, useState } from "react";

import { styled, Box, Typography } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";

import { getConversation, setConversation } from "../../../services/api";
import { emptyProfilePicture } from "../../../constants/data";
import { UserContext } from "../../../context/userProvider";
import { formatDate } from "../../../utils/helper";

const Component = styled(Box)`
  height: 45px;
  display: flex;
  padding: 13px 0;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  objectFit: "cover",
  borderRadius: "50%",
  padding: "0 14px",
});

const Container = styled(Box)`
  display: flex;
`;

const Timestamp = styled(Typography)`
  font-size: 12px;
  margin-left: auto;
  color: #00000099;
  margin-right: 20px;
`;

const Text = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
`;

const Conversation = ({ user }) => {
  const url = user.photo || emptyProfilePicture;

  // const { setPerson } = useContext(UserContext);
  const { setPerson } = useContext(AccountContext);

  const getUser = async () => {
    setPerson(user);
    // await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component onClick={getUser}>
      <Box>
        <Image src={url} alt="display picture" />
      </Box>
      <Box style={{ width: "100%" }}>
        <Container>
          <Typography style={{ textTransform: "capitalize" }}>
            {user.name}
          </Typography>
          {/* {message?.text && (
            <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          )} */}
          <Timestamp>12:30PM</Timestamp>
        </Container>
        <Box>
          <Text>
            {/* {message?.text?.includes("localhost") ? "media" : message.text} */}
            media
          </Text>
        </Box>
      </Box>
    </Component>
  );
};

export default Conversation;
