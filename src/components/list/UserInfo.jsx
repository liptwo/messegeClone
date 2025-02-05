import React, { useState } from 'react'
import { useUserStore } from '../../lib/userStore';
import { auth } from '../../lib/firebase';

const UserInfo = () => {
  const [Open, setOpen] = useState(); 
    const {currentUser, fetchUserInfo} = useUserStore(); 
  return (
    <div className='userInfo flex items-center justify-between'>
        <div className='flex items-center gap-[20px]'>
            <img className='w-[50px] h-[50px] rounded-full' src={currentUser.avatar || "./avatar.png"} alt="avatar" />
            <h2 className=''>{currentUser.username}</h2>
        </div>
        <div className='icon flex gap-[20px]'>
          <div className='relative'>
            <img onClick={()=>setOpen(!Open)} src="./more.png" alt="more" />
            {Open && (
              <div className='p-[20px] w-[100px]
              h-[50px] bg-white top-[40px] absolute rounded-2xl hover:bg-amber-100'>
                <div className='flex h-full w-full items-center justify-center'>
                  <button className='text-black p-20' onClick={()=>auth.signOut()}>Log Out</button>
                </div>
              </div>
            )}
          </div>

            <img src="./video.png" alt="video" />
            <img src="./edit.png" alt="edit" />
        </div>
 

    </div>
  )
}

export default UserInfo