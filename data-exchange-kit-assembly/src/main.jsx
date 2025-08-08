import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Play from './routes/Play'
import Board from './routes/Board'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/play', element: <Play /> },
  { path: '/board', element: <Board /> }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
