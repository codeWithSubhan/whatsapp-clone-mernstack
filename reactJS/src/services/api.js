import axios from "axios";

const url = "http://localhost:4000";

export const addUser = async (data) => {
  try {
    let response = await axios.post(`${url}/api/users`, data);
    return response.data;
  } catch (error) {
    alert("Error while calling addUser API ", error);
  }
};

export const getUsers = async () => {
  try {
    let response = await axios.get(`${url}/api/users`);
    return response.data;
  } catch (error) {
    alert("Error while calling getUsers API ", error);
  }
};

export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/api/conversation`, data);
  } catch (error) {
    alert("Error while calling setConversation API ", error);
  }
};

export const getConversation = async (users) => {
  console.log("users", users);
  try {
    let response = await axios.get(
      `${url}/api/conversation?senderId=${users.senderId}&receiverId=${users.receiverId}`,
      users
    );
    return response.data;
  } catch (error) {
    alert("Error while calling getConversation API ", error);
  }
};

export const getMessages = async (id) => {
  try {
    let response = await axios.get(`${url}/api/message/text/${id}`);
    return response.data;
  } catch (error) {
    alert("Error while calling getMessages API ", error);
  }
};

export const newMessages = async (data) => {
  try {
    return await axios.post(`${url}/api/message/text`, data);
  } catch (error) {
    alert("Error while calling newConversations API ", error);
  }
};

export const uploadFile = async (data) => {
  try {
    return await axios.post(`${url}/api/message/file`, data);
  } catch (error) {
    alert("Error while calling newConversations API ", error);
  }
};
