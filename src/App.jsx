import { useEffect } from "react";
import Chat from "./components/chat/Chat"
import Detail from "./components/detail/Detail"
import List from "./components/list/List"
import Login from "./components/login/Login";
import Notification from "./components/notification/notification.jsx";
import { auth } from "./lib/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/userStore";
const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      fetchUserInfo(user?.uid);
    })
    return ()=>{
      unSub();
    };
  }, [fetchUserInfo]);
  console.log(currentUser);   
  if(isLoading) return <div className="loading">Loading...</div>
  return (
    <div className='container flex w-[90vw] h-[90vh] bg-cyan-900/75 rounded-xl backdrop-blur-[19px] backdrop-saturate-[180%]'>
      {
        currentUser ? (<>
          <List/>
          <Chat/>
          <Detail/>
          </>
        ):(<Login/>)
      }
      <Notification/>
    </div>
  )
}

export default App