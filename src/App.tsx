import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./lib/i18n";
import { Home } from "./pages/Home";
import { Privacy } from "./pages/Privacy";
import { Welcome } from "./pages/Welcome";
import { Mixing } from "./pages/Mixing";
import { Mastering } from "./pages/Mastering";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-bg text-ink">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/mixing" element={<Mixing />} />
            <Route path="/mastering" element={<Mastering />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
