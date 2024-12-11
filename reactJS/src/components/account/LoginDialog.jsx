import { Dialog, Typography, List, ListItem, Box, styled } from "@mui/material";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../services/api";
import Signin from "../Authentication/Signin";
import Signup from "../../pages/Signup";
import Register from "../Authentication/Register";

const Component = styled(Box)`
  display: flex;
`;

const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;

const QRCOde = styled("img")({
  margin: "50px 0 0 50px",
  height: 264,
  width: 264,
});

const Title = styled(Typography)`
  font-size: 26px;
  margin-bottom: 25px;
  color: #525252;
  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu,
    Cantarell, Fira Sans, sans-serif;
  font-weight: 300;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    font-size: 18px;
    color: #4a4a4a;
  }
`;

const dialogStyle = {
  marginTop: "12%",
  height: "95%",
  width: "60%",
  maxWidth: "100",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};

function LoginDialog() {
  const { setAccount } = useContext(AccountContext);

  const style = {
    width: 400,
    position: "relative",
    top: "-28px",
  };

  const isLoginPage = window.location.pathname === "/login";
  const isSignupPage = window.location.pathname === "/signup";

  return (
    <Dialog
      open={true}
      BackdropProps={{ style: { backgroundColor: "unset" } }}
      maxWidth={"md"}
      PaperProps={{ sx: dialogStyle }}
    >
      <Component>
        <Container>
          <StyledList>
            <Box sx={style}>
              {isLoginPage && <Signin />}
              {isSignupPage && <Register />}
            </Box>
          </StyledList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QRCOde src={qrCodeImage} alt="QR Code" />
        </Box>
      </Component>
    </Dialog>
  );
}

export default LoginDialog;
