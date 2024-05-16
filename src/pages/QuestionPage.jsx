import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuestionStore } from '../store';

// Import the specific method from html-to-image
import { toPng } from 'html-to-image';

const QuestionPage = () => {
    const { id } = useParams();
    const questions = useQuestionStore(state => state.questions);
    const my_question = questions.find(question => question.id == id);
    const componentRef = useRef();

    const handleShare = () => {
        // Convert the component to PNG image
        toPng(componentRef.current)
            .then(function (dataUrl) {
                // Prepare the image data for sharing to Instagram
                const imageData = dataUrl.replace(/^data:image\/(png|jpeg);base64,/, '');

                // Create a Blob object from the image data
                const blob = base64ToBlob(imageData, 'image/png');

                // Create a FormData object and append the Blob
                const formData = new FormData();
                formData.append('file', blob);

                // Now you can send formData to your server to handle the upload
                // For example, using fetch API or Axios
            })
            .catch(function (error) {
                console.error('Error converting component to image:', error);
            });
    };

    return (
        <div className='bg-zinc-950 w-screen h-screen flex items-center justify-center'>
            <div className="question-dabba bg-white min-w-[390px] max-w-80 min-h-[190px] rounded-3xl flex flex-col gap-2 ">
                <div className='bg-gradient-to-r from-pink-600 to-purple-600 w-auto rounded-3xl min-h-[90px] flex justify-center items-center text-xl text-white font-semibold gap-1'>Ask me anything anonymously</div>
                <div className="textbox flex justify-center items-center" ref={componentRef}>
                    <h1 className='text-2xl  comic-sans mx-3 my-2'>{my_question.question}</h1>
                </div>
                {/* Include a button to trigger the handleShare function */}
                <button onClick={handleShare} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Share on Instagram
                </button>
            </div>
        </div>
    );
};

export default QuestionPage;

// Function to convert base64 to Blob
function base64ToBlob(base64String, type) {
    const binaryString = window.atob(base64String);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: type });
}
