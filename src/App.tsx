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
import CollectionPage from './Components/CollectionPage';
import { FlashcardMode } from './Components/CollectionPageComponents/FlashcardsMode';
import { HeaderAndFooterProvider } from './contexts/headerAndFooterContext.tsx';
import { PremiumPage } from './Components/PremiumPage';

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
        element: <Library/>,
      },
      {
        path: "add-collection",
        element: <AddCollection/>,
      },
      {
        path: "collection/:collectionId",
        element: <CollectionPage/>
      },
      {
        path: "collection/:collectionId/flashcards",
        element: <FlashcardMode/>
      }
    ]
  },
  {
    path: "/user/:publicId/verifyEmail",
    element: <VerifyEmail/>
  },
  {
    path: "user/:publicId/premium",
    element: <PremiumPage/>
  }
]);

function App() {

  return (
    <HeaderAndFooterProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </HeaderAndFooterProvider>
  )
}

export default App
