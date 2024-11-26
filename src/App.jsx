import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Graficas from "./pages/Graficas";
import NotFound from "./pages/NotFound";
import Reportes from "./pages/Reportes";
import LoginView from "./pages/Login";
import RegistroView from "./pages/RegistroView";

const App = () => {
  return (
    <div>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegistroView />} />
          <Route path="/graficas" element={<Graficas />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
