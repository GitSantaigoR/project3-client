import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import "./Navbar.css"
const Navbar = () => {
    
    const { logOutUser, getToken } = useContext(AuthContext)

    return (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/books">All Books</Link>
          {!getToken() && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
    
          {getToken() && (
            <>
              <Link to="/add-book">List Book</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={logOutUser}>Logout</button>
            </>
          )}
        </nav>
      );
    };

    
export default Navbar