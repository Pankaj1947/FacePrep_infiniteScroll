import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import { Login } from "./components/Pages/Login";
import { Home } from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
