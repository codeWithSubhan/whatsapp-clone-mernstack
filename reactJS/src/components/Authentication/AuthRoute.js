import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../context/AccountProvider";

function AuthRoute({ children }) {
  const { isAuth } = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}

export default AuthRoute;
