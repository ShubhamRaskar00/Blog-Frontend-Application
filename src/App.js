import "./assets/style/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import MainPage from "./pages/MainPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectToSignin from "./components/RedirectToSignin";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RedirectToSignin />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route
            path="/home/*"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
