import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { get, post } from "../services/authService";

const Cart = () => {
  const [thisCart, setThisCart] = useState(null);

  const { user } = useContext(AuthContext);

  const getCart = () => {
    if (user) {
      get("/cart")
        .then((response) => {
          setThisCart(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const removeFromCart = (bookId) => {
    post(`/cart/remove-book/${bookId}`)
      .then((response) => {
        console.log("Removed book ===>", response.data);
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emptyCart = () => {
    post("/cart/clear-cart")
      .then((response) => {
        console.log("Empty Cart", response.data);
        getCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkoutCart = () => {
    post(`/transaction/checkout/${thisCart._id}`)
        .then((response) => {
            window.location.assign(response.data.url)
            console.log("Checkout response ====>", response.data)
        })
        .catch((err) => {
            console.log(err);
          });

  }

  useEffect(() => {
    getCart();
  }, [user]);

  return (
    <div>
      <h1>Your Cart</h1>
      {thisCart && (
        <div>
          {thisCart.books.length > 0 && (
            <>
              {thisCart.books.map((book) => {
                return (
                  <div key={book._id}>
                    <h3>{book.title}</h3>
                    <button onClick={() => removeFromCart(book._id)}>
                      Remove
                    </button>
                  </div>
                );
              })}
            </>
          )}

          <h3>Total: {thisCart.total}</h3>
          <button onClick={checkoutCart}>Checkout</button>
          <button onClick={emptyCart}>Empty Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
