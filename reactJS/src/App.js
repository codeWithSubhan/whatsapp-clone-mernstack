import { BrowserRouter, Route, Routes } from "react-router-dom";
import Messenger from "./components/Messenger";
import AccountProvider from "./context/AccountProvider";
import UserProvider from "./context/userProvider";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthRoute from "./components/Authentication/AuthRoute";

function App() {
  return (
    <UserProvider>
      <AccountProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <Messenger />
                </AuthRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </UserProvider>
  );
}

export default App;
