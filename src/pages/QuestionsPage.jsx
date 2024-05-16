import React, { useEffect, useState } from 'react';
import { useChitthiStore, useLoginStore, useQuestionStore } from '../store';
import chitthiImage from '../assets/chitthi.jpg'; // Correct image import syntax
import { Link } from 'react-router-dom';

const QuestionsPage = () => {
    const id = useLoginStore(state => state.id);
    const [loading, setLoading] = useState(true)
    const [isPost, setIsPost] = useState(false)
    const [copied, setCopied] = useState(false)

    const fetchQuestions = useQuestionStore(state => state.getQuestions);
    useEffect(() => {
        fetchQuestions(id);
        setLoading(false)
        console.log(pfpURL)
    }, []); // Add dependencies to useEffect

    const questions = useQuestionStore(state => state.questions);
    const clickedImageIds = useChitthiStore(state => state.clickedImageIds)
    const addClickedImageId = useChitthiStore(state => state.addClickedImageId)
    const reversedQuestions = [...questions].reverse(); // reverse questions to see the newer ones first
    const pfpURL = useLoginStore(state => state.pfpURL)

    return (
        <div className=" min-h-screen bg-zinc-950 overflow-hidden">
            <div className="activepage flex justify-center gap-4  ">
                <div
                    className="div1 text-white font-semibold text-2xl font-sans mt-4"
                    onClick={() => setIsPost(true)}
                >
                    <h3>Post</h3>
                    {isPost && <div className="bg-pink-700 h-1 w-auto mt-0"></div>}

                </div>
                <div
                    className="div2 text-white font-semibold text-2xl font-sans mt-4"
                    onClick={() => setIsPost(false)}
                >
                    <h3>Questions</h3>
                    {!isPost && <div className="bg-pink-700 h-1 w-auto"></div>}

                </div>
            </div>
            <div className="flex items-center justify-center min-h-screen ">
            {isPost && (
        <div className="post-section mt-4 bg-zinc-900 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-white mb-6">Create a Post</h2>
            
            <div className="mb-4">
                <p className="text-xl text-gray-400 mb-2">Your post URL:</p>
                <div className="flex flex-col gap-7 items-center justify-between">
                    <Link to={`http://localhost:5173/post/${id}`}>

                    <p className="text-pink-400 text-center font-semibold text-2xl">https://istg-dev.vercel.app/post/{id}</p>
                    </Link>
                    <div className='w-full'>

                    <button
                        className={`${!copied ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white': 'bg-white text-black'} copy-button py-2 px-4 text-xl rounded w-full `}
                        onClick={() => {
                            const postUrl = `https://istg-dev.vercel.app/post/${id}`;
                            navigator.clipboard.writeText(postUrl);
                            setCopied(!copied)
                        }}
                    >
                        {copied? 'Copied!!' : 'Copy Link'}
                    </button>
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-600 my-4" />
        </div>
    )}
                {!isPost
                    &&
                    <div className="container bg-zinc-900 rounded-lg py-9 px-7 shadow-lg mx-[0] flex  w-[360px] min-h-96  flex-col overflow-hidden">

                        <h1 className="text-3xl font-semibold text-white mb-8">Your Questions</h1>
                        {loading ?
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            :

                            <div className="flex gap-2 flex-wrap">

                                {reversedQuestions.map(question => (
                                    <div key={question.id}>
                                        <Link to={`/question/${question.id}`}>
                                            <img
                                                src={chitthiImage}
                                                className={`rounded-md ${clickedImageIds.includes(question.id) ? 'grayscale' : ''}`}
                                                alt=""
                                                width={94}
                                                onClick={() => addClickedImageId(question.id)}
                                            /> {/* Use imported image variable */}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        }

                    </div>
                }

            </div>
        </div>
    );
};

export default QuestionsPage;
