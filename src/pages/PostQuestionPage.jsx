import React, { useState } from 'react'
import { useQuestionStore } from '../store'
import { Link, useParams } from 'react-router-dom'

const PostQuestionPage = () => {
    const [question, setQuestion] = useState('')
    const {id} = useParams();
    const postQuestion = useQuestionStore(state => state.postQuestion)
    const handlePost = () => { 
        postQuestion(id, question)
        setQuestion('')
     }
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
            <div className="bg-zinc-900 rounded-lg py-12 px-9 shadow-lg mx-2">
                <h2 className="text-3xl font-semibold mb-6 text-white">Send an Anonymous Message</h2>
                <input
                    type="text"
                    className="w-full px-3 py-4 bg-zinc-800 text-white rounded mb-4 focus:outline-none focus:bg-zinc-700 my-4"
                    placeholder="Enter your Anonymous Message"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                    className="w-full py-2 bg-pink-600 rounded text-white font-semibold focus:outline-none transition-colors hover:bg-slate-50 hover:text-black outline-black"
                    onClick={handlePost}
                >
                    Post
                </button>
                <p className='text-md my-3 text-white mx-auto'>Wanna have qna on your profile? <Link to={'/'} className='text-pink-400 underline font-semibold'>Click Here</Link></p>
            </div>
            {/* <QuestionsPage/> */}
        </div>
  )
}

export default PostQuestionPage
