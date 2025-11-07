import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import GraficasView from "./pages/GraficasView";
import NotFound from "./pages/NotFound";
import Reportes from "./pages/Reportes";
import LoginView from "./pages/Login";
import RegistroView from "./pages/RegistroView";
import RegistroCultivo from "./pages/RegistroCultivo";
import CRUDParcelas from "./pages/CRUDParcelas";

const App = () => {
  return (
    <div>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegistroView />} />
          <Route path="/graficas" element={<GraficasView />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/registro-cultivo" element={<RegistroCultivo />} />
          <Route path="/registro-parcelas" element={<CRUDParcelas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
