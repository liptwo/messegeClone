import React, { useState } from 'react'
import "./Login.css"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

const Login = () => {
    const [avatar, setAvatar] = useState({
        file:null,
        url:''
    });
    const [loading, setLoading] = useState(false);
    const handleAvatar = e =>{
        if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0]),

        }) }
    }
    const [mode, setMode] = useState("login");
    const handleLogin = async(e) =>{
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.target);
      const {email, password} = Object.fromEntries(formData);

      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res);
        if(res === null){ toast.error("Something wrong!");}
        else{
          toast.success("Login Successfull");
        }
        // ...
      }
      catch(error){
        toast.error(error.message);
      }
      finally{
        setLoading(false);
      }

    }
    const handleRegister = async (e) =>{
      e.preventDefault();
      setLoading(true)
      const formData = new FormData(e.target);
      const {username, email, password} = Object.fromEntries(formData);
      try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        // const imgUrl = await uploadImageToGitHub(avatar.url);
        // console.log(imgUrl);
        await setDoc (doc(db, "users", res.user.uid),{
          username: username,
          email,
          id: res.user.uid,
          blocked:[],
        });
        await setDoc (doc(db, "userchats", res.user.uid),{
          chats:[],
        });
        toast.success("Account created! You can login now");
        setTimeout(() => {
          setMode("login");
        }, 2000); 
      }catch(err){
        toast.error(err.message)
      }
      finally{
        setLoading(false)
      }
    }
  return (
    <div className='login'>
      <div className="item">
        <div className={`${mode === "register"? "hidden":""}`}>
          <h2>Wellcome back,</h2>
          <form onSubmit={handleLogin} action="reset">
              <input type="text" placeholder='Email' name='email' />
              <input type="password" placeholder='Password' name='password' />
              <button disabled={loading}>{loading? "Loading":"Sign In"}</button>
          </form>
          <a onClick={()=>setMode("register")}>Create New Account?</a>
        </div>
        <div className={` ${mode === "register"? "":"hidden"}`}>
            <div className='intro'>
              <img src="./favicon.png" alt="" />
              <h2>Chat App Van Huynh</h2>
              <p>Chat app platform website fast and safe for you and your infomation.</p>
            </div>
          </div>
      </div>

      <div className="separator"></div>

        <div className="item">
          <div className={`${mode === "login"? "hidden":""}`}>
              <h2>Create a Account,</h2>
              <form onSubmit={handleRegister}>
                  <label htmlFor="file">
                      <img src={avatar.url || "./avatar.png"} alt="" />
                      Upload an Image</label>

                  <input type="file" style={{display:"none"}} onChange={handleAvatar} id="file" />
                  <input type="text" placeholder='Username' name='username' />    
                  <input type="text" placeholder='Email' name='email' />
                  <input type="password" placeholder='Password' name='password' />
                  <button disabled={loading}>{loading? "Loading":"Sign Up"}</button>
              </form>
              <a onClick={()=>setMode("login")}>Have Already Account?</a>
          </div>
          <div className={` ${mode === "login"? "":"hidden"}`}>
            <div className='intro'>
              <img src="./favicon.png" alt="" />
              <h2>Chat App Van Huynh</h2>
              <p>Chat app platform website fast and safe for you and your infomation.</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login
