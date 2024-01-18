import { post } from "../services/authService"

import { useContext, useState } from "react"

import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/auth.context"

import "./Signup.css";



const Signup = () => {

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleTextInput = (e) => {
        setNewUser((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/auth/signup', newUser)
            .then((response) => {
                storeToken(response.data.authToken)
                authenticateUser()
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="container">
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                name="username"
                type="text"
                value={newUser.username}
                onChange={handleTextInput}
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleTextInput}
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleTextInput}
              />
            </label>
    
            {/* Regular HTML button */}
            <button type="submit">Signup</button>
          </form>
        </div>
      );
    };

export default Signup