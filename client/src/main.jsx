import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './router/Home.jsx'
import Contato from './router/Contato.jsx'
import Lancamentos from './router/Lancamentos.jsx'
import Opcao from './router/Opcao.jsx'
import ErrorPage from './router/ErrorPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Lancamentos",
        element: <Lancamentos />,
      },
      {
        path: "Opcao",
        element: <Opcao />,
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
