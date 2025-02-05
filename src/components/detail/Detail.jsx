import React from 'react'
import "./Detail.css"
const Detail = () => {
  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Tài Nguyên</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          <div className="photo">
            <div className="photo_items">
              <div className="photo_detail">
                <img src="https://i.pinimg.com/474x/90/36/1d/90361d9b93ff0744ffe848acf30439b0.jpg" alt="" />  
                <span>Tuongquan.png</span>
              </div>
              <img className='downicon' src="./download.png" alt="" />
            </div>
            <div className="photo_items">
              <div className="photo_detail">
                <img src="https://i.pinimg.com/474x/90/36/1d/90361d9b93ff0744ffe848acf30439b0.jpg" alt="" />  
                <span>Tuongquan.png</span>
              </div>
              <img className='downicon' src="./download.png" alt="" />
            </div>
            <div className="photo_items">
              <div className="photo_detail">
                <img src="https://i.pinimg.com/474x/90/36/1d/90361d9b93ff0744ffe848acf30439b0.jpg" alt="" />  
                <span>Tuongquan.png</span>
              </div>
              <img className='downicon' src="./download.png" alt="" />
            </div>
            <div className="photo_items">
              <div className="photo_detail">
                <img src="https://i.pinimg.com/474x/90/36/1d/90361d9b93ff0744ffe848acf30439b0.jpg" alt="" />  
                <span>Tuongquan.png</span>
              </div>
              <img className='downicon' src="./download.png" alt="" />
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Shared File</span>
              <img src="./arrowDown.png" alt="" />
            </div>
          </div>
          <div className='block'> 
            <button>Block User</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail