import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './routes/ErrorPage.tsx';
import App from './routes/App.tsx';
import HomePage from './routes/HomePage.tsx';
import SearchPage from './routes/SearchPage.tsx';
import PlaylistPage from './routes/PlaylistPage.tsx';
import AlbumPage from './routes/AlbumPage.tsx';
import ArtistPage from './routes/ArtistPage.tsx';
import TrackPage from './routes/TrackPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'playlist/:id',
        element: <PlaylistPage />,
      },
      {
        path: 'album/:id',
        element: <AlbumPage />,
      },
      {
        path: 'artist/:id',
        element: <ArtistPage />,
      },
      {
        path: 'track/:id',
        element: <TrackPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
