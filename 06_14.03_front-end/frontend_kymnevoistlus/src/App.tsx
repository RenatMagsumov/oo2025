import './App.css';

import { Route, Routes } from 'react-router-dom';

import Menu from './components/Menu';
import Athletes from './pages/Athletes';
import Results from './pages/Results';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ManageAthletes from './pages/ManageAthletes';
import ManageResults from './pages/ManageResults';
import Test from './pages/test';

// Новые страницы для детального просмотра и редактирования
import SingleAthlete from './pages/SingleAthlete';
import AthleteEdit from './pages/AthleteEdit';
import SingleResult from './pages/SingleResult';
import ResultEdit from './pages/ResultEdit';

function App() {
  return (
    <>
      <Menu />

      <Routes>
        {/* main page */}
        <Route path="/" element={<MainPage />} />

        {/* admin pages*/}
        <Route path="/admin/athletes" element={<ManageAthletes />} />
        <Route path="/admin/results" element={<ManageResults />} />
        <Route path="/admin/athlete/:id/edit" element={<AthleteEdit />} />
        <Route path="/admin/result/:id/edit" element={<ResultEdit />} />

        {/* public pages */}
        <Route path="/athletes" element={<Athletes />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test" element={<Test />} />
        <Route path="/athlete/:id" element={<SingleAthlete />} />
        <Route path="/result/:id" element={<SingleResult />} />


        {/* Страница 404 */}
        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
}

export default App;
