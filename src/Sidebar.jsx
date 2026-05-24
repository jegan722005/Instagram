import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate=useNavigate();

    return (
        <div className=' m-3 position-fixed'>
            <div className='d-flex flex-column gap-3'>
                <img className='logo-text' src='../public/instaText.png' alt="Not found" />
                <div><i className="bi bi-house-door"></i>Home</div>
                <div><i className="bi bi-search"></i>Search</div>
                <div><i className="bi bi-compass"></i>Explore</div>
                <div><i className="bi bi-play-btn"></i>Reels</div>
                <div><i className="bi bi-send"></i>Message</div>
                <div><i className="bi bi-heart"></i>Notification</div>
                <div><i className="bi bi-plus-square"></i>Create</div>
                <div onClick={()=>navigate('/profile')}><p><i className="bi bi-person-circle"></i>Profile</p></div>
            </div>

            <div className='position-fixed bottom-0 d-flex flex-column gap-3 mb-4'>
                <div><i className="bi bi-threads"></i>Threads</div>
                <div><i className="bi bi-list"></i>More</div>
            </div>
        </div>
    )
}

export default Sidebar

//we can start json server use the cmd
//!npx json-server --watch jsonFoldername/filename.json --port 3000 --static ./jsonFoldername