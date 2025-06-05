import "./App.css";
import NavBar from "./Components/Nav/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
// import { AuthProvider, useAuth } from "./AuthContext";
import DashBoard from "./Components/Dashboard/DashBoard";
import ViewOrder from "./Components/Dashboard/ViewOrder";
import CreateOrder from "./Components/Dashboard/CreateOrder";

function App() {
  return (
    <div className="App">
      {/* <AuthProvider> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<SignIn />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/dashboard" element={<DashBoard/>} >
              <Route index element={<ViewOrder/>} />
              <Route path="/dashboard/create" element={<CreateOrder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
