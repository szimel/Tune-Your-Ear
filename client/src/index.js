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
import "bootstrap/dist/css/bootstrap.css";
import Easy from './components/perfect-pitch/perfect-pitch-quiz'


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
    path: 'perfect-pitch/quiz',
    element: <Easy />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
    />
  </Provider>
);