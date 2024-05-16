import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuestionStore } from '../store';
import './Question.css'

const QuestionPage = () => {
    const { id } = useParams();
    const questions = useQuestionStore(state => state.questions)
    const my_question = questions.find(question => question.id == id)
    // console.log(my_question[0])
    // my_question.isSeen = true
    console.log(my_question)
    return (
        <div className='bg-zinc-950 w-screen h-screen flex items-center justify-center'>
            <div className="question-dabba bg-white min-w-[390px] max-w-70 min-h-[190px] rounded-3xl flex flex-col gap-2 ">
                <div className='bg-gradient-to-r from-pink-600 to-purple-600 w-auto rounded-3xl min-h-[90px] flex justify-center items-center text-xl text-white font-semibold gap-1'>Ask me anything anonymously</div>
                <div className="textbox flex justify-center items-center">

                <h1 className='text-2xl  comic-sans mx-3 my-2'>{my_question.question}</h1>
                </div>
            </div>
        </div>

    )
}

export default QuestionPage
