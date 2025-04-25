import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GridFile from './pages/GuessingForm';
import Results from './pages/Results';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <GridFile />,
    },
    {
      path: '/results',
      element: <Results />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
