import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import Registration from './Components/Registration';
import { UserProvider } from './contexts/userContext';
import Dashboard from './Components/Dashboard';
import VerifyEmail from './Components/VerifyEmail';
import Home from './Components/DashBoardComponents/Home';
import Library from './Components/DashBoardComponents/Library';
import AddCollection from './Components/DashBoardComponents/AddCollection';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Registration />,
  },
  {
    path: "/user/:publicId/dashboard",
    element: <Dashboard/>,
    children: [
      {
        path: "home",
        element: <Home/>
      },
      {
        path: "library",
        element: <Library/>
      },
      {
        path: "add-collection",
        element: <AddCollection/>
      }
    ]
  },
  {
    path: "/user/:publicId/verifyEmail",
    element: <VerifyEmail/>
  }
]);

function App() {

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
