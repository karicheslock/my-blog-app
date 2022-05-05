import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { Link } from 'react-router-dom';


function Home({isAuth}) {
const [postList, setPostList] = useState([]);



const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
}

useEffect(() => {
    const getPosts = async () => {
        const postsCollectionRef = collection(db, "posts");
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    getPosts();
}, [postsCollectionRef]);

useEffect(() => {
    document.title = 'Home';
}, [])

    return (
        <div className='container flex flex-col mx-auto max-w-screen-2xl items-center min-h-screen justify-center'>
            {!isAuth ? (
                <div className='container flex flex-col items-center'>
                    <h1 className='font-bold text-subdued-scarlet text-4xl py-4'>WELCOME TO MY AWESOME TRAVEL JOURNAL WEBSITE</h1>
                    <h1 className='font-bold text-subdued-scarlet text-3xl py-4'>Get ready to post something AMAZING!</h1>
                    <h1 className='font-bold text-subdued-scarlet text-4xl py-4'>Please Click <span className='text-light-teal'><Link to='/login'>Login</Link></span> to Start Creating Your Travel Journal.</h1>
                    <h2 className='font-bold text-subdued-scarlet text-2xl py-4'>You will be able to login with your Google account.</h2>
                </div>
            ) : (          
            postList.map((post) => {
                    return (
                        <div key={post.id} className='flex flex-col mx-auto w-full py-5 px-4 items-center'>
                            <div className='flex mx-auto w-1/2'>
                                <div className='w-full text-xl font-bold text-subdued-scarlet border-4 border-light-teal rounded px-4 py-4 h-36'>
                                    <h1 className='flex justify-center'>{post.title}</h1>
                                </div>
                                <div>
                                    {post.image !== undefined && <img className='max-w-xs h-36' src={post.image} alt={`${post.title}`} />}
                                </div>
                            </div>
                            <div className='w-1/2 h-72 flex flex-wrap text-lg border-4 border-subdued-scarlet rounded'>
                                {post.postText}
                            </div>
                            <div className='flex w-1/2 py-2'>
                                <h3 className='flex w-1/2 text-subdued-scarlet'>@{post.author.name}</h3>
                                <div className='text-md flex ml-40 w-1/8 border-2 border-light-teal rounded bg-light-teal px-4 py-2'>
                                    {isAuth && post.author.id === auth.currentUser.uid && <button className='text-white' onClick={() => {deletePost(post.id)}}>Delete Above Post</button>}
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Home;