import React, { useEffect, useState } from "react";
import "./ChatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore.js";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user= userDocSnap.data();
        return {...item, user};
      });
      const chatData= await Promise.all(promises);
      setChats(chatData.sort((a,b)=>b.updateAt - a.updateAt));
    });
    return () => {
      unSub();
    };
  }, []);
  console.log(chats);
  return (
    <div className="chatList ">
      <div className="search flex items-center justify-center gap-[20px] ">
        <div className="searchBar flex flex-1 items-center gap-[20px] bg-blue-900/75 rounded-xl ">
          <img src="/search.png" alt="icon" />
          <input className="" type="text" placeholder="Search..." />
        </div>
        <div
          className="add flex items-center justify-center"
          onClick={() => setAddMode((prev) => !prev)}
        >
          <img src={addMode ? "./minus.png" : "./plus.png"} alt="" />
        </div>
      </div>
      {chats.map((chat, index)=>(
        <div key={index} className="item">
          <img src={chat.user.avatar || "./avatar.png"} alt="avatar" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
