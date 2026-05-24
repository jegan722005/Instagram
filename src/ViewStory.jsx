import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const ViewStory = () => {

    const { id, tot } = useParams();

    const [story, setStory] = useState(null);

    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        fetch(`http://localhost:3001/story/${id}/${tot}`)
            .then((res) => res.json())
            .then((data) =>{ 
                console.log(data);
                return setStory(data);
            })
            .catch((err) => setError(err));

    }, [id]);

    // convert string to number
    let currentId = Number(id);
    let total = Number(tot);

    // validation
    if (currentId > total || currentId <= 0) {
        navigate('/');
    }

    return (
        <div>
            {story ? (
                <div className=' d-flex justify-content-center align-items-center'>

                    {/* previous button */}
                    <Link to={`/story/${currentId - 1}/${total}`}>
                        <i className='bi bi-arrow-left-circle-fill'></i>
                    </Link>

                    <img className='vh-100' src={story.image} alt={story?.user?.username} />

                    {/* next button */}
                    <Link to={`/story/${currentId + 1}/${total}`} >
                        <i className='bi bi-arrow-right-circle-fill'></i>
                    </Link>

                </div>
            ) : (
               <div style={{ color: "red" }}>{error}</div>
            )}
        </div>
    )
}

export default ViewStory