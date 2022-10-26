import { Routes, Route, Navigate } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import Home from "./pages/home/home";
import Login from "./pages/login";
import { history, isLoggedIn } from "./services/common";

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            isLoggedIn() ? (
              <Navigate replace to={"/home?path=%2Froot"} />
            ) : (
              <Navigate replace to={"/login"} />
            )
          }
        ></Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
