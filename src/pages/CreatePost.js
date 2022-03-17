import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth, storage } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

     const createPost = async () => {
        try {
            await addDoc(postsCollectionRef, { 
                title, 
                postText, 
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }, 
                image,
            });
            navigate("/");
        } catch(error) {
            console.log(error);
        }
    };

    const onImageChange = (event) => {
        event.preventDefault();
        const file = event.target[0].files[0];
        uploadFiles(file);        
    }

    const uploadFiles = (file) => {
        if (!file) return;

        const storageRef = ref(storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        },
        (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(url => setImage(url))
        }
        );
    }

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [])

    useEffect(() => {
        document.title = 'Create A Post';
    }, [])

    return (
        <div className='container flex flex-col mx-auto max-w-screen-md items-center h-screen justify-center'>
            <div className='flex flex-col text-center border-4 border-light-teal rounded'>
                <h1 className='text-3xl text-subdued-scarlet font-bold px-20 py-4 border-b-4 border-light-teal'>Create a Post</h1>
                <div className='flex flex-col'>
                    <label className='text-2xl text-subdued-scarlet py-4 px-2 self-start'>Title:</label>
                    <input className='text-xl py-2 px-4 bg-white' placeholder='Title...' onChange={(event) => {
                        setTitle(event.target.value);
                    }} />
                </div>
                <div className='flex flex-col'>
                    <label className='text-2xl text-subdued-scarlet py-4 px-2 self-start'>Post:</label>
                    <textarea className='text-lg py-2 px-4 bg-white mb-4' placeholder='Post...' onChange={(event) => {
                        setPostText(event.target.value);
                    }} />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <form method="POST" onSubmit={onImageChange}>
                        <label className='text-2xl text-subdued-scarlet py-4'>Add an image?</label>
                        <div className='flex text-subdued-scarlet mt-4'>
                            <input type="file" id='input-btn' className='input' aria-label='Select file' />
                            <button className='border border-subdued-scarlet px-4 rounded' type='submit'>Upload</button>
                        </div>
                    </form>
                    <h3 className='text-subdued-scarlet'>Uploaded {progress} %</h3>
                </div>
                <button onClick={createPost} className='text-3xl text-subdued-scarlet py-2 border-4 m-4 font-bold rounded hover:text-4xl focus:text-4xl'>Submit Post</button>
                <button onClick={() => navigate("/")} className='text-xl text-subdued-scarlet py-2 border-2 m-4 rounded hover:text-2xl focus:text-2xl'>Cancel</button>
            </div>
        </div>
    )
}

export default CreatePost;