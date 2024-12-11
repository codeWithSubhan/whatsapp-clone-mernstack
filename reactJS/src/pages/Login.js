import { AppBar, Box, Toolbar, styled } from "@mui/material";
import LoginDialog from "../components/account/LoginDialog";
import { useContext, useEffect } from "react";
import { AccountContext } from "../context/AccountProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const LoginHeader = styled(AppBar)`
  background: #00bfa5;
  height: 200px;
  box-shadow: none;
`;

function Login() {
  const navigate = useNavigate();
  const { isAuth } = useContext(AccountContext);

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth, navigate]);

  if (isAuth) return;
  return (
    <Component>
      <LoginHeader>
        <Toolbar></Toolbar>
      </LoginHeader>
      <LoginDialog />
    </Component>
  );
}

export default Login;
