import { Routes, BrowserRouter, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
