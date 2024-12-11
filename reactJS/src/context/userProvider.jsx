import { createContext, useState } from "react";
import { postData } from "../utils/helper";
import toast from "react-hot-toast";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [person, setPerson] = useState({});

  // useEffect(() => {
  //   if (!Object.keys(person).length) return;

  //   postData("users", isAuth.token)
  //     .then((res) => {
  //       // if (res.data.length) setUsers(res.data);
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(toast.error(err.message)));
  // }, [person]);

  return (
    <UserContext.Provider value={{ person, setPerson }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
