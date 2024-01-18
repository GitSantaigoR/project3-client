import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import { get, axiosDelete, post } from "../services/authService";

const BookDetailsPage = () => {
  const [book, setBook] = useState(null);

  const [errorMessage, setErrorMessage] = useState('')

  const { bookId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchBook = () => {
    get(`/books/${bookId}`)
      .then((response) => {
        console.log("Found books", response.data);
        setBook(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteBook = (bookId) => {
    axiosDelete(`/books/${bookId}`)
      .then(() => {
        console.log("Book deleted successfully");
        navigate('/books');
      })
      .catch((error) => console.log(error));
  };

  const handleEditBook = () => {
    navigate(`/edit-book/${book._id}`);
  };

  const isOwner = () => {
    return book.seller._id == user._id;
  };

  const addToCart = (bookId) => {
    post(`/cart/add-book/${bookId}`)
    .then((response) => {
      console.log("Added to Cart ===>", response.data)
      navigate('/cart')
    })
    .catch((err) => {
      console.log(err)
      setErrorMessage(err.response.data.message)
    })

  }


  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div>
      {book && (
        <>
          <div>
            <h2>{book.title}</h2>
            <p>Description: {book.description}</p>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genres}</p>
            <p>Pages: {book.pages}</p>
            <p>
              Image: <img src={book.image_url}/>
            </p>
            <p>Price: ${book.price}</p>
          </div>

          {book && user && isOwner() && (
            <>
              <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
              <button onClick={handleEditBook}>Edit</button>
            </>
          )}

          {book && user && !isOwner() && (
            <button onClick={() => addToCart(book._id)}>Add to Cart</button>
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </>
      )}
    </div>
  );
};

export default BookDetailsPage;
