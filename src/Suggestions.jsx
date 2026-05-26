import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Profile from './Profile';
import { Link, useNavigate } from 'react-router-dom';

const Suggestions = () => {

  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {

    fetch("http://localhost:3001/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log("Error", err))

    fetch("http://localhost:3001/suggestions")
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.log("Error", err))

  }, [])

  let handleFollow=async (id,username) => {
    axios.post('http://localhost:3001/followers',{"id" : id , "username" : username})
    .then(alert("Followed !!"))
    .catch((err)=>console.log(err))
  }

  return (

    <div className='position-fixed'>
      <div className='suggestion w-100 m-4'>
        {profile ?
          <div className='d-flex gap-1'>
            <img className='db rounded-circle' src={profile.profile_pic} alt={profile.name || 'Post user'} />
            <Link className='text-decoration-none color-white font-size-bold'
            to={'/profile'}
            >{profile.username}</Link>
            <p className='ms-auto text-primary cursor-pointer'>Switch</p>

          </div>
          : <small>Loading...</small>}

        <div className='d-flex'>
          <p>Suggested for you</p>
          <b className='ms-auto'>See All</b>
        </div>

        {suggestions.length > 0 ? (

          <div>
            {suggestions.map((suggestion) => (
              <div className='my-1' key={suggestion.id}>
                <div className='d-flex gap-2'>
                  <img className='db rounded-circle' src={suggestion.profile_pic} alt='suggestions for user' />
                  <h5 >{suggestion.username}</h5>
                  <a className='text-primary ms-auto cursor-pointer text-decoration-none'
                  onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}
                  >follow</a>
                </div>
              </div>
            ))}
          </div>

        ) : (
          <div>
            Loading Suggestions ....
          </div>
        )}
      </div>

      <div className='d-flex flex-column justify-content-center align-items-center p-4 m-4'>
        <button className='btn btn-secondary p-2'><i className='bi bi-send'></i> See Messages</button>
      </div>
    </div>
  )
}

export default Suggestions
