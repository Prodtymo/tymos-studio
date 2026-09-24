import { ServiceRequest } from "./pages/ServiceRequest";
import { PageMeta } from "./components/PageMeta";
import { NotFound } from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./lib/i18n";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { Privacy } from "./pages/Privacy";
import { Welcome } from "./pages/Welcome";
import { Mixing } from "./pages/Mixing";
import { Mastering } from "./pages/Mastering";
import { Gear } from "./pages/Gear";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-bg text-ink">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/one-stop" element={<ServiceRequest key="one-stop" service="one-stop" />} />
            <Route path="/mixing" element={<Mixing />} />
            <Route path="/mastering" element={<Mastering />} />
            <Route path="/gear" element={<Gear />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <PageMeta />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
