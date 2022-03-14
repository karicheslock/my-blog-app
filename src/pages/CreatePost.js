import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [image, setImage] = useState(null);

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

     const createPost = async () => {
        await addDoc(postsCollectionRef, { 
            title, 
            postText, 
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }, 
            image,
        });
        navigate("/");
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate])

    return (
        <div className='container flex flex-col mx-auto max-w-screen-md items-center h-screen justify-center'>
            <div className='flex flex-col text-center border-4 border-light-teal rounded'>
                <h1 className='text-3xl text-subdued-scarlet font-bold px-20 py-4 border-b-4 border-light-teal'>Create a Post</h1>
                <div className='flex flex-col'>
                    <label className='text-2xl text-subdued-scarlet py-4'>Title:</label>
                    <input className='text-xl py-2 px-4 bg-white' placeholder='Title...' onChange={(event) => {
                        setTitle(event.target.value);
                    }} />
                </div>
                <div className='flex flex-col'>
                    <label className='text-2xl text-subdued-scarlet py-4'>Post:</label>
                    <textarea className='text-lg py-2 px-4 bg-white' placeholder='Post...' onChange={(event) => {
                        setPostText(event.target.value);
                    }} />
                </div>
                <div className='flex items-center justify-center'>
                    <label className='text-2xl text-subdued-scarlet py-4'>Add an image?</label>
                    <input accept="image/*" id="icon-button-file"
                        type="file" style={{ display: 'none' }} className='filetype' />
                    <label htmlFor="icon-button-file" className='mt-2'>
                        <IconButton color="primary" aria-label="upload picture"
                        component="span" onChange={onImageChange}>
                        <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <button onClick={createPost} className='text-3xl text-subdued-scarlet py-2 border-4 m-4 font-bold rounded hover:text-4xl focus:text-4xl'>Submit Post</button>
                <button onClick={() => navigate("/")} className='text-xl text-subdued-scarlet py-2 border-2 m-4 rounded hover:text-2xl focus:text-2xl'>Cancel</button>
            </div>
        </div>
    )
}

export default CreatePost;