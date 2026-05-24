import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Profile = () => {

    const [profile, setProfile] = useState(null);

    const [followers, setFollowers] = useState([]);
    const [unFollow, setUnFollow] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/profile')
            .then((data) => {
                console.log(data);
                return setProfile(data.data);
            }).catch((err) => console.log(err));

    }, [])
    console.log(profile);
    useEffect(() => {
        axios.get('http://localhost:3001/followers')
            .then((data) => {
                console.log(data);
                return setFollowers(data.data);
            }).catch((err) => console.log(err));

    }, [unFollow])

    let handleInputChange = (e) => {

        let { name, value } = e.target;

        setProfile({ ...profile, [name]: value });
    }

    const handleUpdate = async () => {
        axios.put('http://localhost:3001/profile', profile)
            .then(console.log("Updated"))
            .catch(err => console.log(err))
    }

    const handleUnFollow = async (id) => {

        axios.delete(`http://localhost:3001/followers/${id}`)
            .then(alert("Unfollowed"))
            .then(setUnFollow(!unFollow))
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex' >
            <div className='split-div m-4'>
                
                {profile !== null ? (
                    <div className='w-0 form-text'>
                        <img src={profile.profile_pic} alt="Image Not Found"
                            className='profile rounded-circle'
                        />
                        <h5>{profile.username}</h5>
    
                        <input type="text" name="username"
                            id="username" value={profile.username}
                            className='form-control my-4'
                            onChange={handleInputChange}
                        />
                        <input type="text" name="profile_pic" id="profile_pic"
                            value={profile.profile_pic}
                            className='form-control'
                            onChange={handleInputChange}
                        /> 
                        <button
                            className='btn btn-primary my-2'
                            onClick={handleUpdate}
                        >Update</button>
    
                        {followers.length > 0 ? (
                            <div className=''>
    
                                <section className='d-flex flex-column p-3 my-3'>
                                    <h4>Followers</h4>
                                    {followers.map((follow) => (
                                        <div className='d-flex justify-content-between items-center my-2 '>
                                            <h4>{follow.username}</h4>
                                            <button className='btn btn-secondary' onClick={()=>handleUnFollow(follow.id)}>Unfollow</button>
                                        </div>
                                    ))}
    
                                </section>
                            </div>
    
    
                        ) : (
                            <div>Loading Followers ....</div>
                        )}
                    </div>
                ) : (
                    <div>Loading Profile...</div>
                )}
        </div>

            <div className='my-5 d-flex gap-5'>
                <aside>
                    <h4>followers</h4>
                    <h2 className='mx-5'>{followers.length}</h2>
                </aside>
                <aside>
                    <h4>following</h4>
                    <h2 className='mx-5'>{followers.length - 2}</h2>
                </aside>
            </div>
        </div>
    )
}

export default Profile
