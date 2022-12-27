import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './home'
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
import Progress from './components/progress/progress'
import Session from './components/perfect-pitch/session'
import Piano from './components/chord-recognition/chord-piano'
import SessionChord from './components/chord-recognition/session'


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
  {
    path: 'progress',
    element: <Progress />
  },
  {
    path: 'perfect-pitch/session',
    element: <Session />
  },
  {
    path: 'chords',
    element: <Piano />
  },
  {
    path: 'chords/session',
    element: <SessionChord />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider
      router={router}
    />
  </Provider>
);