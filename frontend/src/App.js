import logo from './logo.svg';

import './App.css';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import AllRercipesPage from './pages/AllRecipesPage/AllRecipesPage';
import MyRecipesPage from './pages/MyRecipesPage/MyRecipesPage';
import RecipePage from './pages/RecipePage/RecipePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RequireAuth from './components/RequireAuth/RequireAuth';
import AddEditRecipePage from './pages/AddEditRecipePage/AddEditRecipePage';
import AppNavbar from './components/Navbar/Navbar';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route
          element={
            <>
              <RequireAuth>
                <AppNavbar />
                <Outlet />
                <br />
                <br />
                <br />
                <Footer />
              </RequireAuth>
            </>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/all-recipes" element={<AllRercipesPage />} />
          <Route path="/my-recipes" element={<MyRecipesPage />} />
          <Route path="/recipe/add-recipe" element={<AddEditRecipePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route
            path="/recipe/:id/edit-recipe"
            element={<AddEditRecipePage />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
