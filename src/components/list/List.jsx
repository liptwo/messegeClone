import React from "react";
import UserInfo from "./UserInfo";
import ChatList from "./chatlist/ChatList";

const List = () => {
  return <div className="flex flex-1 flex-col">
    <UserInfo/>
    <ChatList/>
  </div>;
};

export default List;
