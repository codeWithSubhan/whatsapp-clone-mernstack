import { Dialog, Typography, List, ListItem, Box, styled } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../services/api";

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
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
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

  async function onLoginSuccess(res) {
    const decoded = jwtDecode(res.credential);
    setAccount(decoded);
    const data = await addUser(decoded);
    console.log("decoded jwt", decoded);
    console.log("decoded jwt", data);
  }

  function onLoginFailure(err) {
    console.log(err);
  }

  return (
    <Dialog
      open={true}
      BackdropProps={{ style: { backgroundColor: "unset" } }}
      maxWidth={"md"}
      PaperProps={{ sx: dialogStyle }}
    >
      <Component>
        <Container>
          <Title>To use WhatsApp on your computer:</Title>
          <StyledList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
            <ListItem>
              3. Point your phone to this screen to capture the code
            </ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QRCOde src={qrCodeImage} alt="QR Code" />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateX(25%) translateY(-25%)",
            }}
          >
            {/* {showloginButton ? ( */}
            <GoogleLogin
              buttonText=""
              onSuccess={onLoginSuccess}
              onError={onLoginFailure}
            />
            {/* ) : null} */}
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
}

export default LoginDialog;
