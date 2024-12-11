import { AppBar, Toolbar, styled, Box } from "@mui/material";

import ChatDialog from "./chat/ChatDialog";

const Component = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const Header = styled(AppBar)`
  background-color: #00a884;
  height: 125px;
  box-shadow: none;
`;

function Messenger() {
  return (
    <Component>
      <Header>
        <Toolbar></Toolbar>
      </Header>
      <ChatDialog />
    </Component>
  );
}

export default Messenger;
