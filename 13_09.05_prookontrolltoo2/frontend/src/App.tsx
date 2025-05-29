import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SingleWord from "./pages/SingleWord";
import AddWord from "./pages/AddWord";
import ManageWords from "./pages/ManageWords";
import Haldajad from "./pages/Haldajad";
import WordsByHaldaja from "./pages/WordsByHaldaja";
import Menu from "./components/Menu";
import AddHaldaja from "./pages/AddHaldaja";

function App() {
  return (
    <div className="container">
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/word/:id" element={<SingleWord />} />
        <Route path="/add" element={<AddWord />} />
        <Route path="/manage" element={<ManageWords />} />
        <Route path="/haldajad" element={<Haldajad />} />
        <Route path="/haldaja/:id" element={<WordsByHaldaja />} />
        <Route path="/add-haldaja" element={<AddHaldaja />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}


export default App;
