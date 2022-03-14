import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

function Home({isAuth}) {
const [postList, setPostList] = useState([]);
const postsCollectionRef = collection(db, "posts");


const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
}

useEffect(() => {
    const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    getPosts();
}, [deletePost]);

    return (
        <div className='container flex flex-col mx-auto max-w-screen-md items-center h-screen justify-center'>
            {postList.map((post) => {
                return (
                    <div className='flex flex-col mx-auto w-full py-5 px-4 items-center'>
                        <div className='flex mx-auto w-1/2'>
                            <div className='w-full text-xl font-bold text-subdued-scarlet border-4 border-light-teal rounded px-4 py-4'>
                                <h1>{post.title}</h1>
                            </div>
                            <div>
                                {console.log(post.image)}
                                {post.image !== undefined && <img src={post.image} alt={`${post.title} image`} />}
                            </div>
                            <div className='text-lg self-center'>
                                {isAuth && post.author.id === auth.currentUser.uid && <button onClick={() => {deletePost(post.id)}}> &#128465;</button>}
                            </div>
                        </div>
                        <div className='w-1/2 h-36 flex flex-wrap text-lg border-4 border-subdued-scarlet rounded'>
                            {post.postText}
                        </div>
                        <h3 className='flex w-1/2'>@{post.author.name}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default Home;