import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Guesses from './pages/Guesses';
import GridFile from './pages/GuessingForm';
import Results from './pages/Results';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <GridFile />,
    },
    {
      path: '/guesses',
      element: <Guesses />,
    },
    {
      path: '/results',
      element: <Results />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
