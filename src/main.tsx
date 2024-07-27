import ReactDOM from "react-dom/client";
import "./index.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TimersPage from "./pages/timersPage/TimersPage.tsx";
import TimersContextProvider from "./store/Timers-context.tsx";
import StopWatchPage from "./pages/stopWatchPage/StopWatchPage.tsx";
import AlarmPage from "./pages/alarm/AlarmPage.tsx";
import CalenderPage from "./pages/calender/CalenderPage.tsx";
import RootLayout from "./layouts/rootLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <TimersContextProvider>
            <TimersPage />
          </TimersContextProvider>
        ),
      },
      {
        path: "/alarm",
        element: <AlarmPage />,
      },
      {
        path: "/stopwatch",
        element: <StopWatchPage />,
      },
      {
        path: "/calender",
        element: <CalenderPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
