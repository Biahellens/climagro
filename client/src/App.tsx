import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { UseMobile } from "@contexts/MobileContext";
import { Stack } from "@mui/material";

// Pages
import Login from "@pages/Login/Login";
import Dashboard from "@pages/Dashboard/Dashboard";
import ListDevices from "@pages/ListDevices/ListDevices";
import Users from "@pages/Users/Users";
import NewUser from "@pages/newUser/newUser";

// Components
import Header from "@components/Header/Header";
import MenuNavigation from "@components/Menu/MenuNavigation";

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
  const { isMobile } = UseMobile();

  return (
    <>
      <Stack height={isMobile ? '100%' :"100vh"} justifyContent="space-between">
        <Header />
        <Stack
          flexDirection="row"
          width="100%"
          position={isMobile ? 'relative' : "fixed"}
          top={isMobile ? 0 :"5rem"}
          height='100%'
          sx={{
            overflow: isMobile ? 'scroll' : ''
          }}
        >
          {!isMobile && <MenuNavigation />}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/listDevice" element={<ListDevices />} />
            <Route path='/users' element={<Users />} />
            <Route path='/new-user' element={<NewUser />} />
          </Routes>
        </Stack>
      </Stack>
    </>
  );
}
