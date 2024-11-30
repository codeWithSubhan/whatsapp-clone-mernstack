import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./context/AccountProvider";
import UserProvider from "./context/userProvider";

function App() {
  const clientId =
    "1049461627897-q5q37241aa93ug6n7hmrajn4uu55lokq.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <AccountProvider>
          <Messenger />
        </AccountProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
