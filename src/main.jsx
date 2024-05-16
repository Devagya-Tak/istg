import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useLoginStore } from './store.js'
import LoginPage from './pages/LoginPage.jsx'
import QuestionsPage from './pages/QuestionsPage.jsx'
import QuestionPage from './pages/QuestionPage.jsx'
import PostQuestionPage from './pages/PostQuestionPage.jsx'

const MyComponent = () => { 
  const isLoggedIn = useLoginStore(state => state.isLoggedIn)
  return (
    <>
      {!isLoggedIn? <LoginPage/> : <QuestionsPage/> }
    </>
  )
 }

const router = createBrowserRouter([
  {
    path: '/',
    element: <MyComponent/>
  },
  {
    path: '/question/:id',
    element: <QuestionPage/>
  },
  {
    path: '/post/:id',
    element: <PostQuestionPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>

    <App />
    </RouterProvider>
  </React.StrictMode>,
)
