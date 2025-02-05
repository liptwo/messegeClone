import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
const Chat = () => {
  const [chat, setChat] = useState("");
  const [Text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({behavior:"smooth"})
  }, []);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", "myNKSxqmaFD5xiE46YfH"), (res)=>{
      setChat(res.data());
    })

    return()=>{
      unSub();
    }
  }, []);
  console.log(chat);
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };
  const {currentUser} = useUserStore();


  return (
    <div className="chat flex-2">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <span>{currentUser.username}</span>
            <p>Online</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              soluta suscipit debitis repellat, qui in iste expedita
              perspiciatis aliquam mollitia magnam dignissimos hic, iure
              asperiores. Vel aliquid minus dolore hic.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://i.pinimg.com/736x/ab/88/5a/ab885a99c4085ec73b9058f507add69c.jpg" alt="" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              soluta suscipit debitis repellat, qui in iste expedita
              perspiciatis aliquam mollitia magnam dignissimos hic, iure
              asperiores. Vel aliquid minus dolore hic.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              soluta suscipit debitis repellat, qui in iste expedita
              perspiciatis aliquam mollitia magnam dignissimos hic, iure
              asperiores. Vel aliquid minus dolore hic.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://i.pinimg.com/736x/3c/62/af/3c62af9e101cb1b45f203419bafdbd66.jpg" alt="" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
              soluta suscipit debitis repellat, qui in iste expedita
              perspiciatis aliquam mollitia magnam dignissimos hic, iure
              asperiores. Vel aliquid minus dolore hic.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="endRef" ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type message..."
          value={Text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker
              open={open}
              emojiStyle="apple"
              onEmojiClick={handleEmoji}
            />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
