import React, { useEffect, useState } from 'react'

import {useNavigate} from 'react-router-dom'

const Stories = () => {

  const [stories, setStories] = useState([]);

  const navigate=useNavigate();

  let tot=0;

  useEffect(() => {

    fetch('http://localhost:3001/story')
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err))

  }, [])

  return (
     <div className='story d-flex'>
      <div className='d-none'>
      {tot=stories.length}
      </div>
      {stories.length > 0 ? (
        stories.map((story) => (

          <div key={story.id} className='mx-2' onClick={()=>{navigate(`/story/${story.id}/${tot}`)}}>
            <div className='gradient-border'>
              <img src={story.user?.profile_pic} alt="dp" className='story-dp rounded-circle ' />
            </div>
            <p className='text-truncate' style={{ width: '50px' }}>{story.user?.username}</p>
          </div>

        ))
      ) : (
        <p>Loading....</p>
      )}
    </div>
  )
}

export default Stories
