import { createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../constants/data";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("https://whatsapp-clone-mernstack.vercel.app", {
      transports: ["websocket", "polling"],
    });
  }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        showloginButton,
        setShowloginButton,
        showlogoutButton,
        setShowlogoutButton,
        socket,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
