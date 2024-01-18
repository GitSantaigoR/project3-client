import { useEffect, useContext, useState } from "react"
import { get } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


const CartSuccess = () => {

  const [thisCart, setThisCart] = useState(null);

  const { user, storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate()

  const clearCart = () => {
    if (user) {
      get("/cart")
        .then((response) => {
          setThisCart(response.data);
          return response.data._id
        })
        .then((cartId) => {
          get(`/transaction/success/${cartId}`)
          .then((response) => {
            console.log("Success redirect", response)
            storeToken(response.data.authToken)
            authenticateUser()
            navigate('/books')
          })
          .catch((err) => {
            console.log(err);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    clearCart()
  }, [])
  return (
    <div>
      <h1>Thank you for your purchase!</h1>
    </div>
  )
}

export default CartSuccess
