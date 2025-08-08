import React from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './ui/App'
import Play from './ui/Play'
import Board from './ui/Board'

const router = createHashRouter([
  { path: '/', element: <App /> },
  { path: '/play', element: <Play /> },
  { path: '/board', element: <Board /> }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
