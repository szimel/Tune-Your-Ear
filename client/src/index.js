import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './reducers/store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './components/signup'
import Login from './components/login'
import PerfectPitch from './components/perfect-pitch/perfect-pitch'
import Test from './components/perfect-pitch/perfect-pitch'
import "bootstrap/dist/css/bootstrap.css";
import Easy from './components/perfect-pitch/easy'
import Intermediate from './components/perfect-pitch/intermediate'
import Hard from './components/perfect-pitch/hard'


//routes config *loaders and fetcher to update state?*
const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: 'perfect-pitch',
    element: <PerfectPitch />,
  },
  {
    path: 'perfect-pitch/easy',
    element: <Easy />
  },
  {
    path: 'perfect-pitch/medium',
    element: <Intermediate />
  },
  {
    path: 'perfect-pitch/hard',
    element: <Hard />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
    />
  </Provider>
);