import { createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getData, postData } from "../utils/helper";
import toast from "react-hot-toast";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [person, setPerson] = useState({});
  const [account, setAccount] = useState();
  const [isAuth, setIsAuth] = useState(
    JSON.parse(window.localStorage.getItem("userData"))
  );
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);

  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");
  const [userData, setUserData] = useState(
    JSON.parse(window.localStorage.getItem("userData")) || []
  );

  useEffect(() => {
    if (!isAuth) return;

    getData("users", isAuth.token)
      .then((res) => {
        if (res.data.length) setUsers(res.data);
      })
      .catch((err) => console.log(toast.error(err.message)));
  }, [isAuth]);

  useEffect(() => {
    const createChatAndFetchMessages = async () => {
      if (!Object.keys(person).length) return;

      try {
        const res = await postData("chats", isAuth.token, {
          userId: person._id,
        });
        setPerson((prev) => ({ ...prev, chatId: res.data._id }));
        setChatId(res.data._id);
      } catch (err) {
        console.error(err.message);
        toast.error(err.message);
      }
    };

    createChatAndFetchMessages();
  }, [person._id]);

  useEffect(() => {
    if (!chatId) return;
    const createChatAndFetchMessages = async () => {
      try {
        const res1 = await getData(`messages/${chatId}`, isAuth.token);
        setMessages(res1.data);
      } catch (err) {
        console.error(err.message);
        toast.error(err.message);
      }
    };

    createChatAndFetchMessages();
  }, [chatId, newMessageFlag]);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        showloginButton,
        setShowloginButton,
        showlogoutButton,
        setShowlogoutButton,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag,
        isAuth,
        setIsAuth,
        users,
        person,
        setPerson,
        messages,
        setMessages,
        userData,
        setUserData,
        chatId,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
