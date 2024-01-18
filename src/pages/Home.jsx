import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome to Your Bookstore App!</h2>
      {user ? (
        // If the user is authenticated, show personalized content
        <>
          <p>Hello, {user.username}!</p>
            {/* Use Bootstrap Button */}
            
          {/* Add more personalized content or features here */}
        </>
      ) : (
        // If the user is not authenticated, show information or encourage sign-up/login
        <>
          <p>Explore a wide collection of books and connect with readers!</p>
          <p>Sign up or log in to start listing and selling your books.</p>
          {/* Add sign-up or log-in buttons or links */}
        </>
      )}
    </div>
  );
};

export default Home;