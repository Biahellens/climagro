import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Stack } from "@mui/material";

// Pages
import Login from "@pages/Login/Login";
import Dashboard from "@pages/Dashboard/Dashboard";

// Components
import Header from "@components/Header/Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route index element={<Navigate to="/login" />} />
        <Route path="*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;

function ProtectedRoutes() {
  //const isMobile = UseMobile();

  return (
    <>
      <Stack height="100vh" justifyContent="space-between">
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Stack>
    </>
  );
}
