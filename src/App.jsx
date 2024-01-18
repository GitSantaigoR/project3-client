import "./App.css";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateBookPage from "./pages/CreateBookPage";
import BookListPage from "./pages/BookListPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import BookEditPage from "./pages/BookEditPage";
import Cart from './pages/Cart'
import CartSuccess from "./pages/CartSuccess";
import CartCancel from "./pages/CartCancel";



function App() {
  const { getToken } = useContext(AuthContext);

  const IsLoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const IsLoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <>
    
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        

      
        <Route path="/edit-book/:bookId" element={<BookEditPage />} />

        <Route path="/add-book" element={<CreateBookPage />} />

        <Route path="/books" element={<BookListPage />} />

        <Route path="/books/:bookId" element={<BookDetailsPage />} />

        <Route element={<IsLoggedOut />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<IsLoggedIn />}>
          <Route path="/profile" element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/success" element={<CartSuccess />} />
          <Route path='/cancel' element={<CartCancel />} />
        </Route>
      </Routes>
     
    </>
  );
}

export default App;