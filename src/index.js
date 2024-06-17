import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App';
import Login from './views/Login';
import Home from './views/Home';
import Files from './views/Files';
import SearchResults from './views/SearchResults';
import Scheduled from './views/Scheduled';
import Indexed from './views/Indexed';
import {PrivateRoute, PublicRoute} from './components/CustomRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <PublicRoute/>,
                children: [{path: 'auth', element: <Login/>}],
            },
            {
                element: <PrivateRoute/>,
                children: [
                    {
                        path: 'home',
                        element: <Home/>,
                        children: [
                            {path: 'files', element: <Files/>},
                            {path: 'scheduled', element: <Scheduled/>},
                            {path: 'indexed', element: <Indexed/>},
                            {path: 'search', element: <SearchResults/>},
                        ],
                    },
                ],
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);
