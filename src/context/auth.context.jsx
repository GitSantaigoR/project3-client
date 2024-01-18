// src/context/auth.context.jsx

import { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { get, post } from "../services/authService";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate()

  const storeToken = (token) => {
    //  <==  ADD
    localStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  };

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const createCart = () => {
    post('/cart')
      .then((response) => {
        storeToken(response.data.authToken)
        authenticateUser()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const authenticateUser = () => {
    //  <==  ADD
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      get("/auth/verify")
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data;

          console.log("Authenticate User/Decoded Token ===>", user);
          if (!user.cart) {
            createCart()
          } else {

            setIsLoading(false);
            setUser(user);
          }
          // Update state variables
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          removeToken();
          setIsLoading(false);
          setUser(null);
          navigate('/')
        });
    } else {
      // If the token is not available (or is removed)
      removeToken();
      setIsLoading(false);
      setUser(null);
      navigate('/')
    }
  };

  const logOutUser = () => {
    // <== ADD
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
    navigate('/')
  };

  useEffect(() => {
    authenticateUser(); //  <==  ADD
  }, []);
  /* 
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
