import React, { useEffect, useState } from 'react'

const Posts = () => {

    const [posts,setPosts]=useState([]);

    useEffect(()=>{

        fetch('http://localhost:3001/posts')
        .then((res)=> res.json())
        .then((data)=>{return setPosts(data)})
        .catch((err)=>console.log(err))
    },[]);

  return (
    <div className='d-flex flex-col justify-content-center'>
      {posts.length > 0 ? (

        <div >
            {posts.map((post) => (
                <div className='my-3' key={post.id}>
                    <div className='d-flex gap-2'>
                        <img className='db rounded-circle' src={post.user?.profile_pic} alt={post.user?.name || 'Post user'} />
                        <h5 >{post.user.username}</h5>
                    </div>
                    <img className='image' src={post.image} alt="posts" />
                    <div>
                      <i className='bi bi-heart'></i>
                      <i className='bi bi-chat'></i>
                      <i className='bi bi-send'></i>
                    </div>
                    <div>
                      <b>{post.likes} likes</b>
                    </div>
                    <p>{post.caption}</p>
                </div>
            ))}
        </div>
      ) : (
        <div>
            Loading Posts ....
        </div>
      )
      }
    </div>
  )
}

export default Posts
