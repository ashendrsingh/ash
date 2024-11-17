import { Route, BrowserRouter, Routes ,Navigate } from "react-router-dom"
import LoginForm from "./pages/components/loginPage.js"
import RegisterForm from "./pages/components/RegisterForm.js"
import Dashboard from "./pages/components/Dashboard.js"
import LeadTable from "./pages/components/LeadTable.js"
import PrivateRoute from "./pages/components/PrivateRoute .js"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/leadTable" element={<PrivateRoute><LeadTable /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
